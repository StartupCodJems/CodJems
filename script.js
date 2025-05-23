document.addEventListener('DOMContentLoaded', function() {
    // Elementos do menu mobile
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.createElement('div');
    const sections = document.querySelectorAll('.page-section');
    
    // Cria overlay do menu
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
    
    // Oculta todas as seções exceto a especificada
    function showOnly(sectionId) {
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
        
        // Scroll suave para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Fecha o menu mobile
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    }
    
    // Inicializa mostrando apenas a seção "inicio"
    showOnly('inicio');
    
    // Menu mobile
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        navOverlay.addEventListener('click', closeMobileMenu);
        
        // Navegação pelos links do menu
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = this.getAttribute('href').substring(1);
                closeMobileMenu();
                showOnly(targetSection);
            });
        });
    }
    
    // Botão "Quero Indicar"
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (navLinks && navLinks.classList.contains('active')) {
                closeMobileMenu();
            }
            showOnly('formulario');
        });
    }
    
    // Verifica se há hash na URL ao carregar a página
    if (window.location.hash) {
        const targetSection = window.location.hash.substring(1);
        const validSections = Array.from(sections).map(section => section.id);
        
        if (validSections.includes(targetSection)) {
            showOnly(targetSection);
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
  const scrollArrow = document.querySelector('.scroll-down-arrow');
  let lastScrollPosition = 0;
  const scrollThreshold = 100; // Quantidade de scroll necessária para esconder

  if (scrollArrow) {
    window.addEventListener('scroll', function() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      // Esconde a seta quando scrollar para baixo
      if (currentScrollPosition > lastScrollPosition && currentScrollPosition > scrollThreshold) {
        scrollArrow.classList.add('hidden');
      } 
      // Mostra novamente se scrollar para o topo
      else if (currentScrollPosition < lastScrollPosition && currentScrollPosition <= scrollThreshold) {
        scrollArrow.classList.remove('hidden');
      }
      
      lastScrollPosition = currentScrollPosition;
    });
  }
});