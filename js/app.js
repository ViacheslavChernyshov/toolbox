/**
 * Toolbox Web — Main Application Script
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize i18n
  if (window.ToolboxI18n) {
    window.ToolboxI18n.init();
  }

  // 2. Initialize Visual Animations & Interactive Canvas
  if (window.ToolboxAnimations) {
    window.ToolboxAnimations.init();
  }

  // 3. Initialize Interactive Simulator Terminal
  if (window.ToolboxSimulator) {
    window.ToolboxSimulator.init();
  }

  // 4. Header & Language Dropdown Toggle
  const langToggleBtn = document.querySelector("#lang-toggle-btn");
  const langDropdown = document.querySelector(".lang-dropdown");

  if (langToggleBtn && langDropdown) {
    langToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!langDropdown.contains(e.target)) {
        langDropdown.classList.remove("open");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        langDropdown.classList.remove("open");
      }
    });
  }

  // 5. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
  const navLinks = document.querySelector("#nav-menu");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
      });
    });
  }

  // 6. Header Scrolled State
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 7. Smooth Scroll for internal hash links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // 8. Live Telemetry Update Simulation
  setInterval(() => {
    const latSpan = document.querySelector("#telemetry-latency-val");
    if (latSpan) {
      const ms = Math.floor(Math.random() * 8) + 38;
      latSpan.textContent = `${ms}ms`;
    }
  }, 4000);
});
