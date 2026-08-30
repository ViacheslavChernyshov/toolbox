/**
 * Toolbox Web — Interactive Visual Effects & Animations
 * Canvas Cyber-Mesh, Before/After Compression Slider, Counters, and Filters
 */
(function () {
  // 1. Dynamic Particle Cyber Canvas
  function initCyberCanvas() {
    const canvas = document.querySelector("#cyber-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(60, Math.floor(window.innerWidth / 25));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "rgba(0, 245, 212, 0.4)" : "rgba(121, 40, 202, 0.35)"
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 245, 212, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse interaction
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100) {
          p.x += (mdx / mdist) * 1.5;
          p.y += (mdy / mdist) * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(render);
    }

    render();
  }

  // 2. Interactive Before/After Compression Slider
  function initCompressionSlider() {
    const container = document.querySelector(".compare-container");
    const slider = document.querySelector("#compare-slider");
    const beforeLayer = document.querySelector(".compare-layer.before");
    const divider = document.querySelector(".compare-divider");

    if (!container || !slider || !beforeLayer || !divider) return;

    function updatePosition(pct) {
      pct = Math.max(0, Math.min(100, pct));
      beforeLayer.style.clipPath = `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`;
      divider.style.left = `${pct}%`;
      slider.value = pct;
    }

    slider.addEventListener("input", (e) => {
      updatePosition(e.target.value);
    });

    let isDragging = false;

    function handlePointer(e) {
      const rect = container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const pct = ((clientX - rect.left) / rect.width) * 100;
      updatePosition(pct);
    }

    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      handlePointer(e);
    });

    window.addEventListener("mousemove", (e) => {
      if (isDragging) handlePointer(e);
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    container.addEventListener("touchstart", (e) => {
      isDragging = true;
      handlePointer(e);
    });

    window.addEventListener("touchmove", (e) => {
      if (isDragging) handlePointer(e);
    });

    window.addEventListener("touchend", () => {
      isDragging = false;
    });

    // Default position
    updatePosition(50);
  }

  // 3. Platform Filter Radar & Live Search
  function initPlatformSearch() {
    const searchInput = document.querySelector("#platform-search");
    const filterTabs = document.querySelectorAll(".platform-tab");
    const platformCards = document.querySelectorAll(".platform-card");

    if (!platformCards.length) return;

    let activeCategory = "all";

    function filterCards() {
      const query = (searchInput ? searchInput.value : "").trim().toLowerCase();

      platformCards.forEach((card) => {
        const name = (card.getAttribute("data-name") || "").toLowerCase();
        const cat = card.getAttribute("data-category") || "all";
        const tags = (card.getAttribute("data-tags") || "").toLowerCase();

        const matchCat = activeCategory === "all" || cat === activeCategory;
        const matchQuery = !query || name.includes(query) || tags.includes(query);

        if (matchCat && matchQuery) {
          card.style.display = "flex";
          setTimeout(() => (card.style.opacity = "1"), 20);
        } else {
          card.style.opacity = "0";
          setTimeout(() => (card.style.display = "none"), 200);
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", filterCards);
    }

    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        filterTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        activeCategory = tab.getAttribute("data-filter") || "all";
        filterCards();
      });
    });
  }

  // 4. FAQ Accordions
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const header = item.querySelector(".faq-question");
      if (header) {
        header.addEventListener("click", () => {
          const isOpen = item.classList.contains("open");
          faqItems.forEach((i) => i.classList.remove("open"));
          if (!isOpen) {
            item.classList.add("open");
          }
        });
      }
    });
  }

  // 5. Scroll Reveals & Counters
  function initScrollReveals() {
    const reveals = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  window.ToolboxAnimations = {
    init: function () {
      initCyberCanvas();
      initCompressionSlider();
      initPlatformSearch();
      initFaqAccordion();
      initScrollReveals();
    }
  };
})();
