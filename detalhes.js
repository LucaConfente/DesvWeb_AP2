function PlayerId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10);
}

function montaCartao(entrada) {

    const cardDetalhes = document.createElement('div');
    cardDetalhes.id = "cartaoDetalhes";

    const imgContainerDetalhes = document.createElement('div');
    imgContainerDetalhes.id= "imgContainerDetalhes";

    const imagem = document.createElement('img');
    imagem.alt = `Foto de ${entrada.nome}`;
    imagem.src = entrada.imagem;
    imagem.style.width = '100%';
    imagem.style.maxHeight = "auto"

    cardDetalhes.appendChild(imagem);

    const infoContainer = document.createElement('div');

    const posicao = document.createElement('p');
    posicao.innerHTML = `<strong>${entrada.nome}<br>${entrada.posicao}</strong>`;
    posicao.style.fontSize = '20px';
    posicao.style.textAlign = 'center'
    posicao.style.textTransform = "uppercase"

    const detalhes = document.createElement('p');
    detalhes.innerHTML =`<b>Informações do Jogador</b><br> ${entrada.detalhes}`;
    detalhes.style.fontSize = '20px';
    detalhes.className = "chama";

    const n_jogos = document.createElement('p');
    n_jogos.innerHTML = `<b>Jogos pelo Botafogo:</b> ${entrada.n_jogos}`;
    n_jogos.style.fontSize = '20px';
    n_jogos.className = "chama";
    
    const nascimento = document.createElement('p');
    nascimento.innerHTML = `<b>Data de Nascimento:</b> ${entrada.nascimento}`;
    nascimento.style.fontSize = '20px';
    nascimento.className = "chama";

    const altura = document.createElement('p');
    altura.innerHTML = `<b>Altura:</b> ${entrada.altura}`;
    altura.style.fontSize = '20px';
    altura.className = "chama";

    const naturalidade = document.createElement('p');
    naturalidade.innerHTML = `<b>Naturalidade:</b> ${entrada.naturalidade}`;
    naturalidade.style.fontSize = '20px';
    naturalidade.className = "chama";

    const buttonVoltar = document.createElement('button');
    buttonVoltar.id = "BotaoVoltar";
    buttonVoltar.innerHTML = "Voltar";
    buttonVoltar.style.width = "100px";
    buttonVoltar.style.alignItems = "center";
    buttonVoltar.style.height = "40px";
    buttonVoltar.style.fontSize = "30px";
    buttonVoltar.onmouseover = () => {
        buttonVoltar.style.transform = 'scale(1.08)';
    };
    buttonVoltar.onmouseout = () => {
        buttonVoltar.style.transform = 'scale(1)';
    };
    
    buttonVoltar.onclick = () => window.location.href = "index.html";

    infoContainer.append(posicao, detalhes, n_jogos, nascimento, altura, naturalidade, buttonVoltar);
    infoContainer.style.gridAutoColumns
    cardDetalhes.append(infoContainer);

    return cardDetalhes;
}

async function pegaDados(id) {
    try {
        const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
        return response.ok ? await response.json() : null;
    } catch (error) {
        console.error('Erro ao buscar os dados do jogador:', error);
        return null;
    }
}


function configurarLogout() {
    document.getElementById('logout').onclick = () => {
        localStorage.removeItem('logado');
        localStorage.removeItem('jogadorDetalhes');
        window.location.href = 'index.html';
    };
}

async function carregaDetalhes() {
    if (!localStorage.getItem('logado')) {
        window.location.href = 'index.html';
        return;
    }

    document.body.innerHTML = `
        <header style=" padding: 0.5em 1em; display: flex; flex-direction: row;">

            <h1 style="color: white; margin: 0; flex-grow: 1;">Atletas Botafogo 2024-1</h1>
            <button id="logout">Sair</button>

        </header>
    `;

    configurarLogout();

    const jogadorId = PlayerId();

    if (isNaN(jogadorId) || jogadorId < 1 || jogadorId > 60) {
        document.body.innerHTML += `<p style="color: red; text-align: center; margin-top: 40px;">Erro ao carregar os dados do jogador.</p>`;
        return;
    }

    const jogador = await pegaDados(jogadorId);

    if (jogador) {
        const cardDetalhes = montaCartao(jogador);
        document.body.appendChild(cardDetalhes);

    } else {
        document.body.innerHTML += `<p style="color: red; text-align: center; margin-top: 40px;">Erro ao carregar os dados do jogador.</p>`;
    }
}

carregaDetalhes();