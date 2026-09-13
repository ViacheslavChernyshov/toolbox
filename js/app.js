/**
 * Toolbox Web — Linear Application Main Script
 * Handles Navigation, i18n, Simulator, Comparison Slider, Platform Radar & Accordions
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize i18n
  if (window.ToolboxI18n) {
    window.ToolboxI18n.init();
  }

  // 2. Initialize Simulator
  if (window.ToolboxSimulator) {
    window.ToolboxSimulator.init();
  }

  // 3. Language Dropdown Toggle
  const langToggleBtn = document.querySelector("#lang-toggle-btn");
  const langDropdown = document.querySelector(".lang-dropdown");

  if (langToggleBtn && langDropdown) {
    langToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("open");
      langToggleBtn.setAttribute("aria-expanded", langDropdown.classList.contains("open"));
    });

    document.addEventListener("click", (e) => {
      if (!langDropdown.contains(e.target) && !langToggleBtn.contains(e.target)) {
        langDropdown.classList.remove("open");
        langToggleBtn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        langDropdown.classList.remove("open");
        langToggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 4. Mobile Navigation Menu & Backdrop Overlay
  const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
  const navLinks = document.querySelector("#nav-menu");
  const mobileBackdrop = document.querySelector("#mobile-nav-backdrop");

  function closeMobileMenu() {
    if (navLinks) navLinks.classList.remove("active");
    if (mobileMenuBtn) mobileMenuBtn.classList.remove("active");
    if (mobileBackdrop) mobileBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openMobileMenu() {
    if (navLinks) navLinks.classList.add("active");
    if (mobileMenuBtn) mobileMenuBtn.classList.add("active");
    if (mobileBackdrop) mobileBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.contains("active");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener("click", closeMobileMenu);
    }

    document.querySelectorAll(".linear-nav-link").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  // 5. Header Scrolled State
  const header = document.querySelector(".linear-header");
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    },
    { passive: true }
  );

  // 6. Interactive Action Matrix Tabs
  const matrixTabs = document.querySelectorAll(".matrix-tab-btn");
  const matrixPanes = document.querySelectorAll(".matrix-content-pane");

  matrixTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab");
      matrixTabs.forEach((t) => t.classList.remove("active"));
      matrixPanes.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      const activePane = document.querySelector(`#pane-${targetTab}`);
      if (activePane) activePane.classList.add("active");
    });
  });

  // 7. Interactive Compression Slider (Mouse & Touch)
  const compareContainer = document.querySelector("#compare-container");
  const compareAfter = document.querySelector("#compare-after");
  const compareHandle = document.querySelector("#compare-handle");

  if (compareContainer && compareAfter && compareHandle) {
    let isDragging = false;

    function setSliderPosition(clientX) {
      const rect = compareContainer.getBoundingClientRect();
      let pos = ((clientX - rect.left) / rect.width) * 100;
      if (pos < 5) pos = 5;
      if (pos > 95) pos = 95;

      const isRtl = document.documentElement.getAttribute("dir") === "rtl";
      if (isRtl) {
        compareAfter.style.width = `${pos}%`;
        compareHandle.style.left = "auto";
        compareHandle.style.right = `${pos}%`;
      } else {
        compareAfter.style.width = `${pos}%`;
        compareHandle.style.left = `${pos}%`;
        compareHandle.style.right = "auto";
      }
    }

    compareContainer.addEventListener("mousedown", (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Touch events for mobile
    compareContainer.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches && e.touches[0]) {
          isDragging = true;
          setSliderPosition(e.touches[0].clientX);
        }
      },
      { passive: true }
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging || !e.touches || !e.touches[0]) return;
        setSliderPosition(e.touches[0].clientX);
      },
      { passive: true }
    );

    window.addEventListener("touchend", () => {
      isDragging = false;
    });
  }

  // 8. Platform Search & Filter
  const platformSearchInput = document.querySelector("#platform-search-input");
  const platformFilterButtons = document.querySelectorAll(".platform-filter-btn");
  const platformCards = document.querySelectorAll(".platform-linear-card");
  const platformNote = document.querySelector("#platform-note");

  let currentCategory = "all";
  let currentSearchQuery = "";

  function filterPlatforms() {
    let visibleCount = 0;
    platformCards.forEach((card) => {
      const name = (card.getAttribute("data-name") || "").toLowerCase();
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const category = (card.getAttribute("data-category") || "all").toLowerCase();

      const matchesSearch = !currentSearchQuery || name.includes(currentSearchQuery) || tags.includes(currentSearchQuery);
      const matchesCategory = currentCategory === "all" || category === currentCategory || tags.includes(currentCategory);

      if (matchesSearch && matchesCategory) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });

    if (platformNote) {
      if (visibleCount === 0) {
        platformNote.textContent =
          window.ToolboxI18n && window.ToolboxI18n.getTranslation("platforms.universal_note")
            ? window.ToolboxI18n.getTranslation("platforms.universal_note")
            : "+ еще 1690+ сайтов поддерживаются автоматически через yt-dlp";
      } else {
        platformNote.textContent = `+ еще 1690+ сайтов поддерживаются автоматически через ядро yt-dlp`;
      }
    }
  }

  if (platformSearchInput) {
    platformSearchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      filterPlatforms();
    });
  }

  platformFilterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      platformFilterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-filter") || "all";
      filterPlatforms();
    });
  });

  // 9. FAQ Accordions
  const faqItems = document.querySelectorAll(".faq-linear-item");
  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-linear-trigger");
    if (trigger) {
      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        faqItems.forEach((i) => i.classList.remove("open"));
        if (!isOpen) {
          item.classList.add("open");
        }
      });
    }
  });

  // 10. Smooth Scroll for internal hash links with header offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 74;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
});
