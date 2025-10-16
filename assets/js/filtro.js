window.onload = () => {
    const grid = document.getElementById("grid-cards");
    const numerosSpan = document.getElementById("numeros");
    const paginacaoContainer = document.getElementById("paginacao-container");

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

    mostrarSkeletons();

    setTimeout(() => {
        const estagios = [
            {
                titulo: "Estágio em Business Intelligence (BI)",
                empresa: "Porto Digital",
                local: "Recife, PE (Híbrido)",
                descricao: "Auxiliar na criação de dashboards em Power BI, extração e tratamento de dados SQL, e análise de indicadores de negócio.",
                tipo: "Estágio",
                formato: "Híbrido",
                cidade: "Recife-PE",
                stack: ["SQL", "Power BI"],
                url:"https://gestaodainformacao.netlify.app/o-curso"
            },
            {
                titulo: "Analista de Dados Jr.",
                empresa: "Neurotech",
                local: "Recife, PE",
                descricao: "Foco em análise exploratória de dados com Python, construção de modelos preditivos e apresentação de resultados para stakeholders.",
                tipo: "CLT",
                formato: "Remoto",
                cidade: "Remoto",
                stack: ["Python"],
                url:"https://gestaodainformacao.netlify.app/o-curso"
            },
            {
                titulo: "Estágio em UX Design / Arquitetura da Informação",
                empresa: "Accenture",
                local: "Recife, PE",
                descricao: "Participar de pesquisas com usuários, criação de wireframes e protótipos, e documentação de jornadas de usuário.",
                tipo: "Estágio",
                formato: "Presencial",
                cidade: "Recife-PE",
                stack: ["UX/UI", "Figma"],
                url:"https://gestaodainformacao.netlify.app/o-curso"
            }
        ];

        const porPagina = 4;
        const totalPaginas = Math.ceil(estagios.length / porPagina);
        let paginaAtual = 1;

        if (estagios.length <= porPagina) paginacaoContainer.style.display = "none";

        function renderizarCards(arrayVagas = estagios) {
            grid.innerHTML = "";
            const inicio = (paginaAtual - 1) * porPagina;
            const fim = inicio + porPagina;
            arrayVagas.slice(inicio, fim).forEach(vaga => {
                const card = document.createElement("div");
                card.className = "card estagio-item";

                // Monta as tags como balões
                const tagsPrincipais = [
                    vaga.tipo,
                    vaga.formato,
                    vaga.cidade,
                    vaga.stack.join('')
                ].filter(Boolean);

                const tagsHTML = tagsPrincipais.map(tag => `<span class="tag-balao">${tag}</span>`).join(' ');

                card.innerHTML = `
                    <h3>${vaga.titulo}</h3>
                    <p><strong>Empresa:</strong> ${vaga.empresa}</p>
                    <p><strong>Local:</strong> ${vaga.local}</p>
                    <p><strong>Descrição:</strong> ${vaga.descricao}</p>
                    <div class="tags">${tagsHTML}</div>
                    <a href="${vaga.url}" class="btn btn-primary-dark" style="margin-top:15px;">Ver Detalhes</a>
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
    }, 1500);
};
