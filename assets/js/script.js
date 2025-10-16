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
window.onload = () => {
    // Array de vagas
    const estagios = [
        {
            titulo: "Estágio em Business Intelligence (BI)",
            empresa: "Porto Digital",
            local: "Recife, PE (Híbrido)",
            descricao: "Auxiliar na criação de dashboards em Power BI, extração e tratamento de dados SQL, e análise de indicadores de negócio.",
            tags: ["Estágio", "SQL", "Power BI"]
        },
        {
            titulo: "Analista de Dados Jr.",
            empresa: "Neurotech",
            local: "Remoto",
            descricao: "Foco em análise exploratória de dados com Python, construção de modelos preditivos e apresentação de resultados para stakeholders.",
            tags: ["CLT", "Remoto", "Python"]
        },
        {
            titulo: "Estágio em UX Design / Arquitetura da Informação",
            empresa: "Accenture",
            local: "Recife, PE",
            descricao: "Participar de pesquisas com usuários, criação de wireframes e protótipos de baixa e alta fidelidade, e documentação de jornadas de usuário.",
            tags: ["Estágio", "UX/UI", "Figma"]
        },
        {
            titulo: "Estágio em Governança de Dados",
            empresa: "CESAR",
            local: "Recife, PE",
            descricao: "Apoiar na implementação de políticas de governança de dados, mapeamento de metadados e garantia da qualidade dos dados mestres.",
            tags: ["Estágio", "Governança"]
        },
        {
            titulo: "Estágio em Governança de Dados",
            empresa: "CESAR",
            local: "Recife, PE",
            descricao: "Apoiar na implementação de políticas de governança de dados, mapeamento de metadados e garantia da qualidade dos dados mestres.",
            tags: ["Estágio", "Governança"]
        }

        // Adicione mais vagas aqui se quiser
    ];

    const porPagina = 4;
    const totalPaginas = Math.ceil(estagios.length / porPagina);
    let paginaAtual = 1;

    const grid = document.getElementById("grid-cards");
    const numerosSpan = document.getElementById("numeros");
    const paginacaoContainer = document.getElementById("paginacao-container");

    // Esconder paginação se tiver 4 ou menos vagas
    if (estagios.length <= porPagina) {
        paginacaoContainer.style.display = "none";
    }

    function renderizarCards() {
        grid.innerHTML = "";
        const inicio = (paginaAtual - 1) * porPagina;
        const fim = inicio + porPagina;
        estagios.slice(inicio, fim).forEach(estagio => {
            const card = document.createElement("div");
            card.className = "card estagio-item";
            card.innerHTML = `
                <h3>${estagio.titulo}</h3>
                <p><strong>Empresa:</strong> ${estagio.empresa}</p>
                <p><strong>Local:</strong> ${estagio.local}</p>
                <p><strong>Descrição:</strong> ${estagio.descricao}</p>
                <div class="tags">${estagio.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
                <a href="#" class="btn btn-primary-dark" style="margin-top: 15px;">Ver Detalhes</a>
            `;
            grid.appendChild(card);
        });
    }

    function renderizarBotoes() {
        if (estagios.length <= porPagina) return; // não renderiza se só houver 4 ou menos

        numerosSpan.innerHTML = "";

        const maxVisiveis = 3;
        let start = Math.max(1, paginaAtual - 1);
        let end = Math.min(totalPaginas, start + maxVisiveis - 1);
        if (end - start + 1 < maxVisiveis) start = Math.max(1, end - maxVisiveis + 1);

        if (start > 1) {
            const dots = document.createElement("span");
            dots.textContent = "...";
            numerosSpan.appendChild(dots);
        }

        for (let i = start; i <= end; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            if (i === paginaAtual) btn.classList.add("ativo");
            btn.addEventListener("click", () => {
                paginaAtual = i;
                atualizarPagina();
            });
            numerosSpan.appendChild(btn);
        }

        if (end < totalPaginas) {
            const dots = document.createElement("span");
            dots.textContent = "...";
            numerosSpan.appendChild(dots);
        }

        document.getElementById("primeira").disabled = paginaAtual === 1;
        document.getElementById("anterior").disabled = paginaAtual === 1;
        document.getElementById("proxima").disabled = paginaAtual === totalPaginas;
        document.getElementById("ultima").disabled = paginaAtual === totalPaginas;
    }

    function atualizarPagina() {
        renderizarCards();
        renderizarBotoes();
    }

    document.getElementById("primeira").addEventListener("click", () => { paginaAtual = 1; atualizarPagina(); });
    document.getElementById("anterior").addEventListener("click", () => { if (paginaAtual > 1) paginaAtual--; atualizarPagina(); });
    document.getElementById("proxima").addEventListener("click", () => { if (paginaAtual < totalPaginas) paginaAtual++; atualizarPagina(); });
    document.getElementById("ultima").addEventListener("click", () => { paginaAtual = totalPaginas; atualizarPagina(); });

    atualizarPagina();
};