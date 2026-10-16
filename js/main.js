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

  const contactEmail = String(config.contactEmail || "").trim();
  if (contactEmail) {
    document.querySelectorAll("[data-contact-email]").forEach((link) => {
      link.href = `mailto:${contactEmail}`;
    });
    document.querySelectorAll("[data-contact-email-label]").forEach((label) => {
      label.textContent = contactEmail;
    });
  }

  const contactPhone = String(config.contactPhone || config.emergencyPhone || "").trim();
  if (contactPhone) {
    const telHref = `tel:${contactPhone.replace(/[^\d+]/g, "")}`;
    document.querySelectorAll("[data-contact-phone]").forEach((link) => {
      link.href = telHref;
    });
    document.querySelectorAll("[data-contact-phone-label]").forEach((label) => {
      label.textContent = contactPhone;
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

  const setActiveSection = (sectionId) => {
    if (isContactPage || !isOnePager) {
      navLinks.forEach((link) => link.classList.remove("is-active"));
      return;
    }

    const hash = `#${sectionId}`;
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const linkHash = href.includes("#") ? `#${href.split("#")[1]}` : "";
      link.classList.toggle("is-active", linkHash === hash);
    });

    if (sectionId && window.history.replaceState) {
      const desiredHash = sectionId === "home" ? "" : hash;
      if ((window.location.hash || "") !== desiredHash) {
        window.history.replaceState(
          null,
          "",
          desiredHash || `${window.location.pathname}${window.location.search}`
        );
      }
    }
  };

  if (isOnePager && !isContactPage) {
    const sectionIds = [
      ...new Set(
        [...navLinks]
          .map((link) => {
            const href = link.getAttribute("href") || "";
            return href.includes("#") ? href.split("#")[1] : "";
          })
          .filter(Boolean)
      ),
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const visible = new Set();

    const pickActive = () => {
      if (!visible.size) return;
      // Prefer the topmost visible section in page order
      const active = sectionIds.find((id) => visible.has(id));
      if (active) setActiveSection(active);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        pickActive();
      },
      {
        // Active when a section crosses the upper band of the viewport
        root: null,
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Initial highlight from hash or home
    const initial =
      (window.location.hash || "").replace(/^#/, "") || "home";
    if (sectionIds.includes(initial)) setActiveSection(initial);
    else setActiveSection("home");
  } else {
    navLinks.forEach((link) => link.classList.remove("is-active"));
  }

  // Fixed nav: sit below topbar at page top; hide on scroll down, show on scroll up
  const sticky = header.querySelector(".site-header__sticky");
  const topbar = header.querySelector(".site-topbar");
  if (sticky) {
    let lastY = Math.max(0, window.scrollY || 0);

    const syncPin = (y) => {
      const topbarH = topbar ? topbar.offsetHeight : 0;
      sticky.style.top = `${Math.max(0, topbarH - y)}px`;
    };

    const onScroll = () => {
      const y = Math.max(0, window.scrollY || 0);
      const delta = y - lastY;
      const menuOpen = header.classList.contains("is-open");

      syncPin(y);

      if (menuOpen || y < 16) {
        sticky.classList.remove("is-hidden");
      } else if (delta > 1) {
        sticky.classList.add("is-hidden");
      } else if (delta < -1) {
        sticky.classList.remove("is-hidden");
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => syncPin(Math.max(0, window.scrollY || 0)));
    syncPin(lastY);
    sticky.classList.remove("is-hidden");
  }
})();
