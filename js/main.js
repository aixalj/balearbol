(() => {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const config = window.BALEARBOL_CONFIG || {};
  const toggle = header.querySelector("[data-menu-toggle]");
  const navLinks = header.querySelectorAll(
    '.site-nav a[href*="#"], .mobile-nav a[href*="#"]'
  );

  const facebookUrl = String(config.facebookUrl || "").trim();
  document.querySelectorAll("[data-facebook-link]").forEach((link) => {
    if (facebookUrl) {
      link.href = facebookUrl;
      link.hidden = false;
    } else {
      link.hidden = true;
    }
  });

  const emergencyPhone = String(config.emergencyPhone || "").trim();
  if (emergencyPhone) {
    const telHref = `tel:${emergencyPhone.replace(/[^\d+]/g, "")}`;
    document.querySelectorAll("[data-emergency-phone]").forEach((link) => {
      link.href = telHref;
    });
    document.querySelectorAll("[data-emergency-phone-label]").forEach((label) => {
      label.textContent = emergencyPhone;
    });
  }

  // Visual language switcher only — translations can hook into data-lang later
  header.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      header.querySelectorAll("[data-lang]").forEach((other) => {
        const active = other === button;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-pressed", active ? "true" : "false");
      });
    });
  });

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("is-menu-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  };

  toggle?.addEventListener("click", () => {
    setOpen(!header.classList.contains("is-open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  header.querySelectorAll("#mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  // Prefer DOM markers over pathname — Vercel may serve /contact without .html
  const isOnePager = Boolean(document.getElementById("home"));
  const isContactPage = Boolean(document.querySelector(".contact-page"));

  const setActiveFromHash = () => {
    if (isContactPage || !isOnePager) {
      navLinks.forEach((link) => link.classList.remove("is-active"));
      return;
    }

    const hash = window.location.hash || "#home";
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const linkHash = href.includes("#") ? `#${href.split("#")[1]}` : "";
      link.classList.toggle("is-active", linkHash === hash);
    });
  };

  window.addEventListener("hashchange", setActiveFromHash);
  setActiveFromHash();
})();
