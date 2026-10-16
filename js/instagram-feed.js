(() => {
  const feed = document.querySelector("[data-instagram-feed]");
  if (!feed) return;

  const config = window.BALEARBOL_CONFIG || {};
  const username = String(config.instagramUsername || "").replace(/^@/, "").trim();
  const profileLinks = document.querySelectorAll("[data-instagram-profile]");
  const apiUrl = config.instagramApiUrl || "/api/instagram";

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

  const playIcon = `
    <span class="instagram-gallery__play" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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

    posts.forEach((post) => {
      const isVideo = Boolean(post.isVideo || post.mediaType === "VIDEO" || post.mediaType === "REELS");
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

      if (isVideo) {
        link.insertAdjacentHTML("beforeend", playIcon);
      }

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
