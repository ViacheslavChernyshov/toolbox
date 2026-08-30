/**
 * Toolbox Web — Multi-language (i18n) Engine
 * Supports 10 languages: en, ru, uk, de, es, it, pt, id, vi, fa (RTL)
 */
(function () {
  const DEFAULT_LANG = "ru";
  const SUPPORTED_LANGS = [
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "uk", name: "Українська", flag: "🇺🇦" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "id", name: "Bahasa", flag: "🇮🇩" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "fa", name: "فارسی", flag: "🇮🇷" }
  ];

  let currentLang = DEFAULT_LANG;

  function detectLanguage() {
    const saved = localStorage.getItem("toolbox_lang");
    if (saved && window.TOOLBOX_LOCALES && window.TOOLBOX_LOCALES[saved]) {
      return saved;
    }
    const browserLang = (navigator.language || navigator.userLanguage || "ru").split("-")[0].toLowerCase();
    if (window.TOOLBOX_LOCALES && window.TOOLBOX_LOCALES[browserLang]) {
      return browserLang;
    }
    return DEFAULT_LANG;
  }

  function getNestedTranslation(obj, path) {
    if (!obj) return null;
    return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
  }

  function applyLanguage(langCode) {
    if (!window.TOOLBOX_LOCALES || !window.TOOLBOX_LOCALES[langCode]) {
      langCode = DEFAULT_LANG;
    }

    currentLang = langCode;
    localStorage.setItem("toolbox_lang", langCode);
    const locale = window.TOOLBOX_LOCALES[langCode];

    // Handle text direction (RTL for Persian)
    const isRtl = locale.dir === "rtl";
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", langCode);
    document.body.classList.toggle("is-rtl", isRtl);

    // Update all elements with data-i18n
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = getNestedTranslation(locale, key);
      if (translation !== null) {
        // If element has children with non-i18n tags, check if it's pure text or HTML
        if (el.dataset.i18nHtml === "true") {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    // Update attributes like placeholder, title, aria-label
    const attrElements = document.querySelectorAll("[data-i18n-attr]");
    attrElements.forEach((el) => {
      const raw = el.getAttribute("data-i18n-attr");
      // Format: "placeholder:simulator.input_placeholder;title:hero.badge"
      const pairs = raw.split(";");
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(":");
        if (attr && key) {
          const val = getNestedTranslation(locale, key.trim());
          if (val !== null) {
            el.setAttribute(attr.trim(), val);
          }
        }
      });
    });

    // Update Language Dropdown Button Text
    const activeFlag = document.querySelector("#current-lang-flag");
    const activeName = document.querySelector("#current-lang-name");
    const matched = SUPPORTED_LANGS.find((l) => l.code === langCode);
    if (matched) {
      if (activeFlag) activeFlag.textContent = matched.flag;
      if (activeName) activeName.textContent = matched.name;
    }

    // Highlight active in dropdown
    document.querySelectorAll(".lang-item").forEach((item) => {
      item.classList.toggle("active", item.getAttribute("data-lang") === langCode);
    });

    // Dispatch event
    window.dispatchEvent(
      new CustomEvent("toolboxLanguageChanged", {
        detail: { lang: langCode, locale: locale }
      })
    );
  }

  function initI18n() {
    const lang = detectLanguage();
    applyLanguage(lang);

    // Bind dropdown click handlers
    document.querySelectorAll(".lang-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const selected = item.getAttribute("data-lang");
        if (selected) {
          applyLanguage(selected);
          const dropdown = document.querySelector(".lang-dropdown");
          if (dropdown) dropdown.classList.remove("open");
        }
      });
    });
  }

  window.ToolboxI18n = {
    init: initI18n,
    setLanguage: applyLanguage,
    getCurrentLanguage: () => currentLang,
    getTranslation: (path) => {
      const locale = window.TOOLBOX_LOCALES[currentLang] || window.TOOLBOX_LOCALES[DEFAULT_LANG];
      return getNestedTranslation(locale, path);
    },
    getSupportedLanguages: () => SUPPORTED_LANGS
  };
})();
