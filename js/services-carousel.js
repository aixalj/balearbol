(() => {
  /**
   * @param {string|Element|null|undefined} value
   * @param {ParentNode} [scope]
   * @returns {Element|null}
   */
  const resolve = (value, scope) => {
    if (!value) return null;
    if (typeof value !== "string") return value;
    return (scope || document).querySelector(value);
  };

  /**
   * @param {{
   *   root: string|Element,
   *   track: string|Element,
   *   dots: string|Element,
   *   cards: string,
   *   label: string,
   *   maxWidth?: number,
   * }} options
   */
  const initScrollCarousel = ({ root, track, dots, cards, label, maxWidth = 699 }) => {
    const carousel = resolve(root);
    const trackEl = resolve(track, carousel || undefined) || resolve(track);
    const dotsHost = resolve(dots, carousel || undefined) || resolve(dots);
    if (!carousel || !trackEl || !dotsHost) return;

    // Avoid double-binding the same track
    if (trackEl.dataset.carouselReady === "true") return;
    trackEl.dataset.carouselReady = "true";

    const cardEls = [...trackEl.querySelectorAll(cards)];
    if (cardEls.length < 2) return;

    const mobileMq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    /** @type {HTMLButtonElement[]} */
    let dotButtons = [];

    const nearestIndex = () => {
      const left = trackEl.scrollLeft;
      let best = 0;
      let bestDist = Infinity;
      cardEls.forEach((card, index) => {
        const dist = Math.abs(card.offsetLeft - left);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      return best;
    };

    const setActive = (index) => {
      dotButtons.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });
    };

    const buildDots = () => {
      dotsHost.replaceChildren();
      dotButtons = cardEls.map((_, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "scroll-carousel__dot";
        button.setAttribute("role", "tab");
        button.setAttribute("aria-label", `${label} ${index + 1}`);
        button.addEventListener("click", () => {
          trackEl.scrollTo({ left: cardEls[index].offsetLeft, behavior: "smooth" });
          setActive(index);
        });
        dotsHost.appendChild(button);
        return button;
      });
      setActive(nearestIndex());
    };

    let ticking = false;
    const onScroll = () => {
      if (!mobileMq.matches) return;
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setActive(nearestIndex());
        ticking = false;
      });
    };

    const syncMode = () => {
      if (mobileMq.matches) {
        if (!dotButtons.length) buildDots();
        else setActive(nearestIndex());
      } else {
        dotsHost.replaceChildren();
        dotButtons = [];
      }
    };

    trackEl.addEventListener("scroll", onScroll, { passive: true });
    mobileMq.addEventListener("change", syncMode);
    window.addEventListener("resize", syncMode);
    syncMode();
  };

  window.initScrollCarousel = initScrollCarousel;

  initScrollCarousel({
    root: "[data-services-carousel]",
    track: "[data-services-track]",
    dots: "[data-services-dots]",
    cards: ".service-card",
    label: "Go to service",
  });

  initScrollCarousel({
    root: "[data-certs-carousel]",
    track: "[data-certs-track]",
    dots: "[data-certs-dots]",
    cards: ".cert-card",
    label: "Go to certification",
  });
})();
