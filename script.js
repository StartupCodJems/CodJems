// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Selecionar todas as seções da página
    const sections = document.querySelectorAll('.page-section');
    // Selecionar todos os links de navegação
    const navLinksList = document.querySelectorAll('.nav-links a');

    // Função para mostrar uma seção específica e esconder as outras
    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
                
                // Rolagem suave para a seção
                window.scrollTo({
                    top: section.offsetTop - 80,
                    behavior: 'smooth'
                });
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Inicialização - mostrar apenas a seção inicial
    showSection('inicio');

    // Adicionar eventos de clique aos links de navegação
    navLinksList.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            
            // Fechar menu mobile se estiver aberto
            navLinks.classList.remove('active');
            
            // Mostrar a seção clicada
            showSection(targetSection);
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
            
            // Fechar outros itens quando um novo é aberto
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.parentElement.classList.remove('active');
                }
            });
        });
    });

    // Filtro de Projetos
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Validação do Formulário
    const form = document.getElementById('indicacaoForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff3860';
                } else {
                    field.style.borderColor = 'rgba(190, 0, 255, 0.3)';
                }
            });
            
            // Verificar checkboxes
            const requiredCheckboxes = form.querySelectorAll('input[type="checkbox"][required]');
            requiredCheckboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    isValid = false;
                    checkbox.nextElementSibling.style.color = '#ff3860';
                } else {
                    checkbox.nextElementSibling.style.color = 'rgba(255, 255, 255, 0.9)';
                }
            });
            
            if (isValid) {
                // Simular envio do formulário
                const submitBtn = form.querySelector('.submit-btn');
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    submitBtn.innerHTML = 'Enviado com sucesso! <i class="fas fa-check"></i>';
                    
                    // Limpar formulário após 2 segundos
                    setTimeout(() => {
                        form.reset();
                        submitBtn.innerHTML = 'ENVIAR INDICAÇÃO';
                        submitBtn.disabled = false;
                        
                        // Mostrar mensagem de sucesso
                        alert('Indicação enviada com sucesso! Entraremos em contato em breve.');
                    }, 2000);
                }, 1500);
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }


    // Efeito de hover nos cards de equipe
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'translateY(-10px)';
            member.style.boxShadow = '0 15px 30px rgba(190, 0, 255, 0.2)';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = '';
            member.style.boxShadow = '';
        });
    });

    // Animação de scroll para a seta
    const scrollArrow = document.querySelector('.scroll-down-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            showSection('projetos');
        });
        
        // Esconder a seta quando o usuário rolar para baixo
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollArrow.classList.add('hidden');
            } else {
                scrollArrow.classList.remove('hidden');
            }
        });
    }
});

// Adicionar classe à navbar quando scrollar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(196, 68, 238, 0.2)';
        navbar.style.background = 'linear-gradient(135deg, #1a0521 0%, #1a0521 100%)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(196, 68, 238, 0.1)';
        navbar.style.background = 'linear-gradient(135deg, #1a0521 0%, #2d0a3a 100%)';
    }
});
