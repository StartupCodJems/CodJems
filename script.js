// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ============ Configurações Gerais ============
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const sections = document.querySelectorAll('.page-section');
    
    // ============ Menu Mobile ============
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // ============ Controle de Abas ============
    function showSection(targetId) {
        // Esconde todas as seções
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Mostra a seção alvo
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            
            // Scroll suave
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    // ============ Navegação ============
    function handleNavigation(targetId) {
        // Fechar menu mobile
        navLinks.classList.remove('active');
        
        // Mostrar seção correspondente
        showSection(targetId);
    }

    // Eventos para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if(this.hash !== '#') {
                e.preventDefault();
                handleNavigation(this.hash);
            }
        });
    });

    // ============ Inicialização ============
    showSection('#inicio'); // Mostra a seção inicial

    // ============ Controle Especial do WhatsApp ============
    document.querySelectorAll('a[href*="whatsapp.com"]').forEach(button => {
        button.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // ============ FAQ Accordion ============
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            faqItem.classList.toggle('active');
            
            document.querySelectorAll('.faq-item').forEach(item => {
                if(item !== faqItem) item.classList.remove('active');
            });
        });
    });

    // ============ Filtro de Projetos ============
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => 
                btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.category === filter) 
                    ? 'block' 
                    : 'none';
            });
        });
    });

    // ============ Validação do Formulário ============
    const form = document.getElementById('indicacaoForm');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const fields = this.querySelectorAll('[required]');
            
            fields.forEach(field => {
                if(!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff3860';
                } else {
                    field.style.borderColor = 'rgba(190, 0, 255, 0.3)';
                }
            });

            if(isValid) {
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    submitBtn.innerHTML = 'Enviado! <i class="fas fa-check"></i>';
                    setTimeout(() => {
                        this.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'ENVIAR INDICAÇÃO';
                        alert('Indicação enviada com sucesso!');
                    }, 2000);
                }, 1500);
            } else {
                alert('Preencha todos os campos obrigatórios!');
            }
        });
    }

    // ============ Efeitos Visuais ============
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'translateY(-10px)';
            member.style.boxShadow = '0 15px 30px rgba(190, 0, 255, 0.2)';
        });
        member.addEventListener('mouseleave', () => {
            member.style.transform = '';
            member.style.boxShadow = '';
        });
    });

    // ============ Controle da Navbar no Scroll ============
    window.addEventListener('scroll', () => {
        navbar.style.background = window.scrollY > 50 
            ? 'linear-gradient(135deg, #1a0521 0%, #1a0521 100%)' 
            : 'linear-gradient(135deg, #1a0521 0%, #2d0a3a 100%)';
        
        navbar.style.boxShadow = window.scrollY > 50 
            ? '0 4px 20px rgba(196, 68, 238, 0.2)' 
            : '0 4px 20px rgba(196, 68, 238, 0.1)';
    });

    // ============ Scroll Down Button ============
    const scrollArrow = document.querySelector('.scroll-down-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', (e) => {
            e.preventDefault();
            handleNavigation('#projetos');
        });
        
        window.addEventListener('scroll', () => {
            scrollArrow.classList.toggle('hidden', window.scrollY > 200);
        });
    }
});