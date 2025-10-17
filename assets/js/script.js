/**
 * ============================================================
 * SCRIPT PRINCIPAL - EXECUTA APÓS O CARREGAMENTO DO DOM
 * ============================================================
 */
document.addEventListener('DOMContentLoaded', function() {

    /**
     * ============================================================
     * HEADER FIXO / ALTERAÇÃO AO SCROLL
     * ============================================================
     */

    // Seleciona o header principal
    const header = document.getElementById('main-header');

    if (header) {
        // Adiciona/remova a classe 'scrolled' quando o usuário rola a página
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled'); // Adiciona efeito quando rolado
            } else {
                header.classList.remove('scrolled'); // Remove efeito quando no topo
            }
        });
    }

    /**
     * ============================================================
     * VALIDAÇÃO DO FORMULÁRIO DE CONTATO
     * ============================================================
     */

    // Seleciona o formulário de contato
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        // Intercepta o envio do formulário
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio real do formulário

            // Captura os valores dos campos
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validação simples: todos os campos devem estar preenchidos
            if (name && email && message) {
                alert('Obrigado pelo seu contato, ' + name + '!');
                contactForm.reset(); // Limpa o formulário após envio
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    // Mensagem de log para confirmar que os scripts foram carregados
    console.log("Scripts do site GI-UFPE carregados!");
});
