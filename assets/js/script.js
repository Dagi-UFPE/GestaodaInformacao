document.addEventListener('DOMContentLoaded', function() {

    // --- SCRIPT DO HEADER (Executa em todas as páginas) ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- SCRIPT DE VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio real do formulário
            
            // Simples validação (pode ser expandida)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert('Obrigado pelo seu contato, ' + name + '!');
                contactForm.reset(); // Limpa o formulário
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    console.log("Scripts do site GI-UFPE carregados!");
});