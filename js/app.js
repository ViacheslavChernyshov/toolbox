/**
 * Toolbox Web — Linear Application Script
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize i18n
  if (window.ToolboxI18n) {
    window.ToolboxI18n.init();
  }

  // 2. Language Dropdown Toggle
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

  // 3. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
  const navLinks = document.querySelector("#nav-menu");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });

    document.querySelectorAll(".linear-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
      });
    });
  }

  // 4. Header Scrolled State
  const header = document.querySelector(".linear-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 5. Interactive Action Matrix Tabs
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

  // 6. FAQ Accordions
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

  // 7. Smooth Scroll for internal hash links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
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
