(() => {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const toggle = header.querySelector("[data-menu-toggle]");
  const mobileNav = header.querySelector("#mobile-nav");
  const navLinks = header.querySelectorAll('.site-nav a[href^="#"], .mobile-nav a[href^="#"]');

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

  const setActiveFromHash = () => {
    const hash = window.location.hash || "#home";
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("is-active", href === hash);
    });
  };

  window.addEventListener("hashchange", setActiveFromHash);
  setActiveFromHash();
})();
