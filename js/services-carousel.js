(() => {
  const carousel = document.querySelector("[data-services-carousel]");
  const track = document.querySelector("[data-services-track]");
  const dotsHost = document.querySelector("[data-services-dots]");
  if (!carousel || !track || !dotsHost) return;

  const cards = [...track.querySelectorAll(".service-card")];
  if (cards.length < 2) return;

  const mobileMq = window.matchMedia("(max-width: 699px)");
  /** @type {HTMLButtonElement[]} */
  let dots = [];

  const nearestIndex = () => {
    const left = track.scrollLeft;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, index) => {
      const dist = Math.abs(card.offsetLeft - left);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });
    return best;
  };

  const setActive = (index) => {
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", active ? "true" : "false");
    });
  };

  const buildDots = () => {
    dotsHost.replaceChildren();
    dots = cards.map((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "services__dot";
      button.setAttribute("role", "tab");
      button.setAttribute("aria-label", `Go to service ${index + 1}`);
      button.addEventListener("click", () => {
        track.scrollTo({ left: cards[index].offsetLeft, behavior: "smooth" });
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
      if (!dots.length) buildDots();
      else setActive(nearestIndex());
    } else {
      dotsHost.replaceChildren();
      dots = [];
    }
  };

  track.addEventListener("scroll", onScroll, { passive: true });
  mobileMq.addEventListener("change", syncMode);
  window.addEventListener("resize", syncMode);
  syncMode();
})();
