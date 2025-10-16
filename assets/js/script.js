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
    const grid = document.getElementById("grid-cards");
    const numerosSpan = document.getElementById("numeros");
    const paginacaoContainer = document.getElementById("paginacao-container");

    // Função para exibir skeletons (simulação de loading)
    function mostrarSkeletons(qtd = 4) {
        grid.innerHTML = "";
        for (let i = 0; i < qtd; i++) {
            const skeleton = document.createElement("div");
            skeleton.className = "card skeleton-card";
            skeleton.innerHTML = `
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-line" style="width:50%"></div>
                <div class="skeleton skeleton-line" style="width:40%"></div>
                <div class="skeleton skeleton-line"></div>
                <div>
                    <span class="skeleton skeleton-tag"></span>
                    <span class="skeleton skeleton-tag"></span>
                    <span class="skeleton skeleton-tag"></span>
                </div>
            `;
            grid.appendChild(skeleton);
        }
    }

    // Exibe skeletons antes de carregar dados
    mostrarSkeletons();

    // Simula tempo de carregamento (ex: vindo do banco)
    setTimeout(() => {
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
                titulo: "Estágio em Engenharia de Software",
                empresa: "In Loco",
                local: "Recife, PE",
                descricao: "Acompanhar o desenvolvimento de aplicações web e mobile, revisão de código e integração de APIs.",
                tags: ["Estágio", "JavaScript", "React"]
            }
        ];

        const porPagina = 4;
        const totalPaginas = Math.ceil(estagios.length / porPagina);
        let paginaAtual = 1;

        if (estagios.length <= porPagina) paginacaoContainer.style.display = "none";

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
            numerosSpan.innerHTML = "";
            const maxVisiveis = 3;
            let start = Math.max(1, paginaAtual - 1);
            let end = Math.min(totalPaginas, start + maxVisiveis - 1);
            if (end - start + 1 < maxVisiveis) start = Math.max(1, end - maxVisiveis + 1);

            if (start > 1) numerosSpan.append("...");
            for (let i = start; i <= end; i++) {
                const btn = document.createElement("button");
                btn.textContent = i;
                if (i === paginaAtual) btn.classList.add("ativo");
                btn.addEventListener("click", () => { paginaAtual = i; atualizarPagina(); });
                numerosSpan.appendChild(btn);
            }
            if (end < totalPaginas) numerosSpan.append("...");
        }

        function atualizarPagina() {
            renderizarCards();
            renderizarBotoes();
        }

        document.getElementById("primeira").onclick = () => { paginaAtual = 1; atualizarPagina(); };
        document.getElementById("anterior").onclick = () => { if (paginaAtual > 1) paginaAtual--; atualizarPagina(); };
        document.getElementById("proxima").onclick = () => { if (paginaAtual < totalPaginas) paginaAtual++; atualizarPagina(); };
        document.getElementById("ultima").onclick = () => { paginaAtual = totalPaginas; atualizarPagina(); };

        atualizarPagina();
    }, 1500); // simula 1,5s de carregamento
};