(() => {
  const feed = document.querySelector("[data-instagram-feed]");
  if (!feed) return;

  const config = window.BALEARBOL_CONFIG || {};
  const username = String(config.instagramUsername || "").replace(/^@/, "").trim();
  const profileLinks = document.querySelectorAll("[data-instagram-profile]");
  const apiUrl = config.instagramApiUrl || "/api/instagram";
  const avatarUrl = "assets/brand/logo-green.png";

  if (username) {
    const href = `https://www.instagram.com/${encodeURIComponent(username)}/`;
    profileLinks.forEach((link) => {
      link.href = href;
      link.hidden = false;
    });
  } else {
    profileLinks.forEach((link) => {
      link.hidden = true;
    });
  }

  const setStatus = (message) => {
    feed.innerHTML = `<p class="instagram-gallery__status">${message}</p>`;
  };

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const relativeTime = (iso) => {
    if (!iso) return "";
    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return "";
    const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "just now";
    if (minutes < 60) return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
    if (hours < 24) return hours === 1 ? "an hour ago" : `${hours} hours ago`;
    if (days < 7) return days === 1 ? "a day ago" : `${days} days ago`;
    if (weeks < 5) return weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
    if (months < 12) return months === 1 ? "a month ago" : `${months} months ago`;
    return years === 1 ? "a year ago" : `${years} years ago`;
  };

  const instagramIcon = `
    <span class="instagram-gallery__ig" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.8"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/>
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/>
      </svg>
    </span>
  `;

  const playIcon = `
    <span class="instagram-gallery__play" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M8.5 6.5v11l9-5.5-9-5.5Z" fill="currentColor"/>
      </svg>
    </span>
  `;

  const renderPosts = (posts) => {
    if (!posts.length) {
      setStatus(
        username
          ? `No posts yet. Follow @${username} on Instagram.`
          : "No Instagram posts to show yet."
      );
      return;
    }

    const grid = document.createElement("div");
    grid.className = "instagram-gallery__grid";
    const handle = username || "instagram";
    const displayHandle =
      handle.length > 18 ? `${handle.slice(0, 16)}…` : handle;

    posts.forEach((post) => {
      const isVideo = Boolean(post.isVideo || post.mediaType === "VIDEO" || post.mediaType === "REELS");
      const childCount = Number(post.childrenCount) || 0;
      const isCarousel = post.mediaType === "CAROUSEL_ALBUM" && childCount > 1;
      const timeLabel = relativeTime(post.timestamp);

      const link = document.createElement("a");
      link.className = "instagram-gallery__item" + (isVideo ? " is-video" : "");
      link.href = post.permalink || (username ? `https://www.instagram.com/${username}/` : "#");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute(
        "aria-label",
        post.caption
          ? post.caption.slice(0, 120)
          : isVideo
            ? "Play Instagram video"
            : "View Instagram post"
      );

      if (isVideo && post.videoUrl) {
        const video = document.createElement("video");
        video.className = "instagram-gallery__media";
        video.src = post.videoUrl;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = "metadata";
        video.setAttribute("poster", post.imageUrl || "");
        link.appendChild(video);

        link.addEventListener("mouseenter", () => {
          video.play().catch(() => {});
        });
        link.addEventListener("mouseleave", () => {
          video.pause();
          video.currentTime = 0;
        });
      } else {
        const img = document.createElement("img");
        img.className = "instagram-gallery__media";
        img.src = post.imageUrl;
        img.alt = post.caption ? post.caption.slice(0, 120) : "Instagram post";
        img.loading = "lazy";
        img.width = 600;
        img.height = 600;
        link.appendChild(img);
      }

      if (isCarousel) {
        link.insertAdjacentHTML(
          "beforeend",
          `<span class="instagram-gallery__badge" aria-hidden="true">1/${childCount}</span>`
        );
      } else if (isVideo) {
        link.insertAdjacentHTML("beforeend", playIcon);
      }

      link.insertAdjacentHTML(
        "beforeend",
        `
        <span class="instagram-gallery__shade" aria-hidden="true"></span>
        <span class="instagram-gallery__meta">
          <img class="instagram-gallery__avatar" src="${avatarUrl}" alt="" width="28" height="28" />
          <span class="instagram-gallery__meta-text">
            <span class="instagram-gallery__user">${escapeHtml(displayHandle)}</span>
            ${timeLabel ? `<span class="instagram-gallery__time">${escapeHtml(timeLabel)}</span>` : ""}
          </span>
        </span>
        ${instagramIcon}
        `
      );

      grid.appendChild(link);
    });

    feed.replaceChildren(grid);
  };

  const renderSetupHint = () => {
    const handle = username ? `@${username}` : "your Instagram account";
    feed.innerHTML = `
      <div class="instagram-gallery__empty">
        <p>
          Connect ${handle} to show live posts here. Add
          <code>INSTAGRAM_ACCESS_TOKEN</code> in Vercel, and set
          <code>instagramUsername</code> in <code>js/config.js</code>.
        </p>
        ${
          username
            ? `<a class="instagram-gallery__follow" href="https://www.instagram.com/${encodeURIComponent(
                username
              )}/" target="_blank" rel="noopener noreferrer">Open Instagram</a>`
            : ""
        }
      </div>
    `;
  };

  fetch(apiUrl)
    .then(async (response) => {
      const data = await response.json().catch(() => ({}));
      if (response.status === 503 || data.configured === false) {
        renderSetupHint();
        return;
      }
      if (!response.ok) {
        throw new Error(data.error || "Could not load Instagram feed.");
      }
      renderPosts(Array.isArray(data.posts) ? data.posts : []);
    })
    .catch((error) => {
      setStatus(error.message || "Could not load Instagram feed.");
    });
})();
