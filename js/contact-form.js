(() => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const config = window.BALEARBOL_CONFIG || {};
  const fileInput = document.getElementById("contact-files");
  const trigger = form.querySelector("[data-upload-trigger]");
  const previews = form.querySelector("[data-upload-previews]");
  const emptySlot = form.querySelector("[data-upload-empty]");
  const statusEl = form.querySelector("[data-form-status]");
  const submitBtn = form.querySelector("[data-submit]");
  const submitLabel = form.querySelector("[data-submit-label]");

  /** @type {File[]} */
  let selectedFiles = [];

  const setStatus = (message, type) => {
    if (!statusEl) return;
    statusEl.hidden = !message;
    statusEl.textContent = message || "";
    statusEl.classList.toggle("is-error", type === "error");
    statusEl.classList.toggle("is-success", type === "success");
  };

  const renderPreviews = () => {
    if (!previews) return;

    previews.querySelectorAll("[data-preview]").forEach((node) => node.remove());

    if (emptySlot) {
      emptySlot.hidden = selectedFiles.length > 0;
    }

    selectedFiles.forEach((file, index) => {
      const slot = document.createElement("div");
      slot.className = "contact-upload__slot";
      slot.dataset.preview = "true";

      const img = document.createElement("img");
      img.alt = file.name;
      img.src = URL.createObjectURL(file);
      slot.appendChild(img);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "contact-upload__slot-remove";
      remove.setAttribute("aria-label", `Remove ${file.name}`);
      remove.textContent = "×";
      remove.addEventListener("click", () => {
        selectedFiles = selectedFiles.filter((_, i) => i !== index);
        renderPreviews();
      });
      slot.appendChild(remove);

      previews.appendChild(slot);
    });
  };

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    const maxFiles = config.maxFiles || 6;
    const maxBytes = config.maxFileBytes || 50 * 1024 * 1024;

    for (const file of incoming) {
      if (!file.type.startsWith("image/") && !/\.(heic|heif)$/i.test(file.name)) {
        setStatus("Only image files are allowed (JPG, PNG, HEIC).", "error");
        continue;
      }
      if (file.size > maxBytes) {
        setStatus(`${file.name} is over 50MB.`, "error");
        continue;
      }
      if (selectedFiles.length >= maxFiles) {
        setStatus(`You can upload up to ${maxFiles} images.`, "error");
        break;
      }
      selectedFiles.push(file);
    }

    renderPreviews();
  };

  trigger?.addEventListener("click", () => fileInput?.click());
  fileInput?.addEventListener("change", () => {
    addFiles(fileInput.files);
    fileInput.value = "";
  });

  const uploadToCloudinary = async (file) => {
    const cloudName = config.cloudinaryCloudName;
    const preset = config.cloudinaryUploadPreset;

    if (!cloudName || !preset) {
      throw new Error("Cloudinary is not configured yet. Add your cloud name in js/config.js.");
    }

    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", preset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body,
    });

    if (!response.ok) {
      throw new Error(`Image upload failed for ${file.name}.`);
    }

    const data = await response.json();
    return data.secure_url;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("", null);

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      address: String(formData.get("address") || "").trim(),
      issue: String(formData.get("issue") || "").trim(),
      images: [],
    };

    submitBtn.disabled = true;
    if (submitLabel) submitLabel.textContent = "Submitting…";

    try {
      if (selectedFiles.length) {
        payload.images = await Promise.all(selectedFiles.map(uploadToCloudinary));
      }

      const response = await fetch(config.contactApiUrl || "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Could not submit your request. Please try again.");
      }

      form.reset();
      selectedFiles = [];
      renderPreviews();
      setStatus("Request submitted. Our team will review your documentation shortly.", "success");
    } catch (error) {
      setStatus(error.message || "Something went wrong.", "error");
    } finally {
      submitBtn.disabled = false;
      if (submitLabel) submitLabel.textContent = "Submit Request";
    }
  });
})();
