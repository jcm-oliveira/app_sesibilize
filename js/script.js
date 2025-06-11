document.addEventListener("DOMContentLoaded", () => {
    // Referencia o container onde a tabela e o resumo serão exibidos.
    // Certifique-se de que o ID no seu consolidado.html seja 'containerTabelaConsolidado'
    const containerResultados = document.getElementById("containerTabelaResultados");

    const urlParams = new URLSearchParams(window.location.search);
    const selecoesUsuario = {};

    // Coleta todas as seleções da URL
    for (const [key, value] of urlParams.entries()) {
        if (key.startsWith("imagem")) {
            const numeroImagem = key.replace("imagem", "");
            selecoesUsuario[`Imagem ${numeroImagem}`] = value;
        }
    }

    // --- LÓGICA DE CLASSIFICAÇÃO E CONTAGEM DE EMOÇÕES ---
    const emocoesPositivas = [
        "Alegria", "Calma", "Coragem", "Amor", "Esperanca", "Tranquilidade"
    ];

    const emocoesNegativas = [
        "Tristeza", "Raiva", "Medo", "Odio", "Desespero", "Ansiedade"
    ];

    let contadorPositivas = 0;
    let contadorNegativas = 0;
    let contadorOutras = 0;

    // Itera sobre os valores (emoções) selecionados pelo usuário para fazer a contagem
    Object.values(selecoesUsuario).forEach(emocao => {
        if (emocoesPositivas.includes(emocao)) {
            contadorPositivas++;
        } else if (emocoesNegativas.includes(emocao)) {
            contadorNegativas++;
        } else {
            contadorOutras++;
        }
    });

    // --- CONSTRUÇÃO DO HTML DA TABELA DE SELEÇÕES E DO RESUMO ---
    let tabelaHTML = "<h2>Suas Seleções</h2>";

    if (Object.keys(selecoesUsuario).length > 0) {
        tabelaHTML += "<table>";
        tabelaHTML += "<thead><tr><th>Imagem</th><th>Emoção Selecionada</th></tr></thead>";
        tabelaHTML += "<tbody>";

        // Ordena as imagens numericamente para exibir na tabela
        const imagensOrdenadas = Object.keys(selecoesUsuario).sort((a, b) => {
            const numA = parseInt(a.replace("Imagem ", ""));
            const numB = parseInt(b.replace("Imagem ", ""));
            return numA - numB;
        });

        imagensOrdenadas.forEach((imagem) => {
            tabelaHTML += `<tr><td>${imagem}</td><td>${selecoesUsuario[imagem]}</td></tr>`;
        });

        tabelaHTML += "</tbody></table>";
    } else {
        tabelaHTML += "<p>Nenhuma seleção foi registrada.</p>";
    }

    // Adiciona o resumo da contagem ao HTML final
    tabelaHTML += `
        <div class="resumo-emocoes">
            <h2>Resumo das Emoções</h2>
            <p>
                <img src="../img/EmotionSorrindo.svg" width="30" height="30" alt=""/>
                Emoções Positivas: <strong>${contadorPositivas}</strong>
            </p>
            <p>
                <img src="../img/EmotionTriste.svg" width="30" height="30" alt="" />
                Emoções Negativas: <strong>${contadorNegativas}</strong></p>
                
            ${contadorOutras > 0 ? `<p>Outras Emoções: <strong>${contadorOutras}</strong></p>` : ''}
        </div>
    `;

    // --- EXIBE O HTML COMPLETO NO CONTAINER NA PÁGINA ---
    containerResultados.innerHTML = tabelaHTML;

    // --- EXEMPLOS DE CONSOLE.LOG PARA DEPURAR (podem ser removidos depois) ---
    console.log('Objeto de seleções do usuário:', selecoesUsuario);
    console.log("Emoção da Imagem 1:", selecoesUsuario["Imagem 1"]);
    console.log("Emoção da Imagem 2:", selecoesUsuario["Imagem 2"]);
    console.log("Emoção da Imagem 3:", selecoesUsuario["Imagem 3"]);

    // Exemplo do IF/ELSE para verificar uma emoção específica (opcional, adicione onde for útil)
    if (selecoesUsuario["Imagem 1"] === "Ansiedade") {
        console.log("A emoção da Imagem 1 é Ansiedade (negativa).");
    } else {
        console.log("A emoção da Imagem 1 NÃO é Ansiedade (considerada positiva ou outra).");
    }

}); 