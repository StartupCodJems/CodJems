document.addEventListener("DOMContentLoaded", function () {
  // Elementos globais
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const navOverlay = document.createElement("div");
  const sections = document.querySelectorAll(".page-section");
  const scrollArrow = document.querySelector(".scroll-down-arrow");

  // Funções principais
  function init() {
    setupNav();
    setupSections();
    setupFAQ();
    setupFormLinks();
    setupScrollArrow();
    checkInitialHash();
  }

  function setupNav() {
    // Overlay do menu mobile
    navOverlay.className = "nav-overlay";
    document.body.appendChild(navOverlay);

    // Menu hamburguer
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", function (e) {
        e.stopPropagation();
        navLinks.classList.toggle("active");
        navOverlay.classList.toggle("active");
        toggleMenuIcon();
      });

      navOverlay.addEventListener("click", closeMobileMenu);
    }

    // Links de navegação
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSection = e.target.getAttribute("href").substring(1);
        handleNavigation(targetSection);
      });
    });
  }

  function setupSections() {
    showOnly("inicio");
  }

  function setupFAQ() {
    // Accordion
    document.querySelectorAll(".faq-question").forEach((question) => {
      question.addEventListener("click", function () {
        const item = this.parentNode;
        toggleFAQItem(item);
      });
    });

    // Links internos do FAQ
    document.querySelectorAll('.faq-answer a[href="#formulario"]').forEach(link => {
      link.addEventListener("click", handleFormClick);
    });
  }

  function setupFormLinks() {
    // Todos os links para o formulário
    document.querySelectorAll('a[href="#formulario"]').forEach(link => {
      if (!isExternalLink(link)) {
        link.addEventListener("click", handleFormClick);
      }
    });
  }

  function setupScrollArrow() {
    if (scrollArrow) {
      // Comportamento do scroll
      window.addEventListener("scroll", handleScroll);
      
      // Clique na seta
      scrollArrow.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSection = scrollArrow.getAttribute("href").substring(1);
        handleNavigation(targetSection);
      });
    }
  }

  // Funções utilitárias
  function isExternalLink(link) {
    return link.href.startsWith('http') || link.target === '_blank';
  }

  function toggleMenuIcon() {
    const icon = hamburger.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    }
  }

  function handleNavigation(targetSection) {
    closeMobileMenu();
    showOnly(targetSection);
  }

  function handleFormClick(e) {
    e.preventDefault();
    if (navLinks?.classList.contains("active")) closeMobileMenu();
    showOnly("formulario");
    scrollToForm();
  }

  function scrollToForm() {
    setTimeout(() => {
      const formSection = document.getElementById("formulario");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

  function toggleFAQItem(item) {
    const wasActive = item.classList.contains("active");
    closeAllFaqItems();
    
    if (!wasActive) {
      item.classList.add("active");
      setTimeout(() => {
        item.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }

  function showOnly(sectionId) {
    sections.forEach((section) => {
      section.style.display = section.id === sectionId ? "block" : "none";
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    history.pushState(null, null, `#${sectionId}`);
    
    if (sectionId !== "faq") closeAllFaqItems();
  }

  function closeMobileMenu() {
    navLinks?.classList.remove("active");
    navOverlay?.classList.remove("active");
    const icon = hamburger?.querySelector("i");
    if (icon) icon.classList.replace("fa-times", "fa-bars");
  }

  function closeAllFaqItems() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });
  }

  function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 100;

    if (currentScroll > lastScroll && currentScroll > threshold) {
      scrollArrow?.classList.add("hidden");
    } else if (currentScroll < lastScroll && currentScroll <= threshold) {
      scrollArrow?.classList.remove("hidden");
    }
    lastScroll = currentScroll;
  }

  function checkInitialHash() {
    if (window.location.hash) {
      const targetSection = window.location.hash.substring(1);
      if (Array.from(sections).some(s => s.id === targetSection)) {
        showOnly(targetSection);
      }
    }
  }

  // Variáveis de estado
  let lastScroll = 0;

  // Inicialização
  init();
});
