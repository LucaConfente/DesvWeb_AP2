import { hex_sha256 } from "./sha256-min.mjs";

console.log(hex_sha256('BotafogoSempre'))
const SenhaLonga = 'a3a3e3f771e5d1e8f54a1c92226f3035da8b10535c137d239ed18b55392cc137';

if (localStorage.getItem('logado')){

    document.body.innerHTML = `
    
    <header style=" padding: 0.5em 1em; display: flex; flex-direction: row;">
        <h1 style="color: white; margin: 0px; flex-grow: 1;"><img id="HeaderEscudo" src="escudo.png" alt="escudobotafogo"> &nbsp;&nbsp; Atletas Botafogo 2024-1</h1>
        <button id="logout">Sair</button>
    </header>
    `;

    document.getElementById('logout').onclick = () => {
        localStorage.removeItem('logado');
        window.location.href = 'index.html';
    }

    const BotaoSair = document.getElementById('logout');
    BotaoSair.onmouseover = () => {
        BotaoSair.style.transform = 'scale(1.08)';
    };
    BotaoSair.onmouseout = () => {
        BotaoSair.style.transform = 'scale(1)';
    };

    const inputPesquisa = document.createElement('input');
    inputPesquisa.type = 'text';
    inputPesquisa.placeholder = 'BUSQUE POR NOME';
    inputPesquisa.style.padding = '1em';
    inputPesquisa.style.border = '14px';
    inputPesquisa.style.borderRadius = '5em';
    inputPesquisa.style.width = '50%';
    inputPesquisa.style.maxWidth = '350px';
    inputPesquisa.style.margin = '10px';
    inputPesquisa.style.textAlign = 'center';

    const divPesquisa = document.createElement('div');
    divPesquisa.id = 'filters';
    divPesquisa.style.textAlign = 'center';
    divPesquisa.style.padding = '5px';
    divPesquisa.style.display = 'flex';
    divPesquisa.style.flexDirection = 'column';
    divPesquisa.style.alignItems = 'center';
    divPesquisa.style.gap = '30px';
    divPesquisa.style.marginBottom = '20px';

    const divBotoes = document.createElement('div');
    divBotoes.style.display = 'flex';
    divBotoes.style.gap = '40px';
    divBotoes.style.marginTop = '30px';

    const Carregando = () => {
        conteudo.innerHTML = '<h2>Carregando...</h2>';
        conteudo.style.color = 'black';
        conteudo.style.textAlign = "center";
        conteudo.style.fontSize = '20px';
    };

    const AtivarBotao = (button) => {
        const buttons = document.querySelectorAll('filterButton');
        buttons.forEach(btn => btn.classList.remove('activeButton'));
        button.classList.add('activeButton');
    };

    let dados;
    const atualizarPesquisa = (caminho, button) => {
        Carregando();
        pegaDados(caminho).then((entrada) => {
            dados = entrada;
            conteudo.innerHTML = '';
            dados.forEach((atleta) => {
                conteudo.appendChild(montaCartao(atleta));
            });
            AtivarBotao(button);  
        });
    };

    const PesquisaMasculino = document.createElement('button');
    PesquisaMasculino.classList.add('filterButton');
    PesquisaMasculino.innerHTML = 'Masculino';
    PesquisaMasculino.onmouseover = () => {
        PesquisaMasculino.style.transform = 'scale(1.08)';
    };
    PesquisaMasculino.onmouseout = () => {
        PesquisaMasculino.style.transform = 'scale(1)';
    };
    PesquisaMasculino.onclick = () => {
        atualizarPesquisa("https://botafogo-atletas.mange.li/2024-1/masculino", PesquisaMasculino);
    };

    const PesquisaFeminino = document.createElement('button');
    PesquisaFeminino.classList.add('filterButton');
    PesquisaFeminino.innerHTML = 'Feminino';
    PesquisaFeminino.onmouseover = () => {
        PesquisaFeminino.style.transform = 'scale(1.08)';
    };
    PesquisaFeminino.onmouseout = () => {
        PesquisaFeminino.style.transform = 'scale(1)';
    };
    PesquisaFeminino.onclick = () => {
        atualizarPesquisa("https://botafogo-atletas.mange.li/2024-1/feminino", PesquisaFeminino);
    };

    const PesquisaTodos = document.createElement('button');
    PesquisaTodos.classList.add('filterButton');
    PesquisaTodos.innerHTML = 'Elenco Completo';
    PesquisaTodos.onmouseover = () => {
        PesquisaTodos.style.transform = 'scale(1.08)';
    };
    PesquisaTodos.onmouseout = () => {
        PesquisaTodos.style.transform = 'scale(1)';
    };
    PesquisaTodos.onclick = () => {
        atualizarPesquisa("https://botafogo-atletas.mange.li/2024-1/all", PesquisaTodos);
    };

    divBotoes.appendChild(PesquisaMasculino);
    divBotoes.appendChild(PesquisaFeminino);
    divBotoes.appendChild(PesquisaTodos);
    divPesquisa.appendChild(divBotoes);
    divPesquisa.appendChild(inputPesquisa);

    document.body.appendChild(divPesquisa);

    const conteudo = document.createElement('div');
    conteudo.id = 'cards';
    document.body.appendChild(conteudo);

    const montaCartao = (entrada) => {
        const card = document.createElement('div');
        card.style.backgroundColor = '#f7f7f7';
        card.style.display = 'grid';
        card.style.margin = '20px';
        card.style.maxWidth = '230px';
        card.style.height = '480px';
        card.style.padding = '5px';
        card.style.border = "5em";
        card.style.borderRadius = "8px";
        card.style.transition = 'transform 0.3s';
        card.onmouseover = () => {
            card.style.transform = 'scale(1.08)';
        };
        card.onmouseout = () => {
            card.style.transform = 'scale(1)';
        };

        const imgContainer = document.createElement('div');
        const imagem = document.createElement('img');
        imagem.src = entrada.imagem;
        imagem.alt = `Foto de ${entrada.nome}`;
        imagem.style.maxWidth = '200px';
        imagem.style.margin = '10px';

        const buttonDetalhes = document.createElement('button');
        buttonDetalhes.innerHTML = '<b>Saiba Mais</b>';
        buttonDetalhes.id = "SaibaMais";

        const posicao = document.createElement('p');
        posicao.innerHTML = entrada.nome;
        posicao.style.fontSize = '15px';
        posicao.style.font = 'bolder';
        posicao.style.textAlign = 'center';
        posicao.style.margin = '20px';

        buttonDetalhes.onclick = () => {
            const jogadorId = entrada.id;
            window.location.href = `detalhes.html?id=${jogadorId}`
        };

        card.appendChild(imgContainer);
        imgContainer.appendChild(imagem);
        card.appendChild(buttonDetalhes);
        card.appendChild(posicao);

        return card;
    };

    inputPesquisa.onkeyup = (ev) => {
        const valorPesquisa = ev.target.value.toLowerCase();
        if (valorPesquisa.length){
            const filtrado = dados.filter(
                (elemento) => {
                    const estaNoNome = elemento.nome.toLowerCase().includes(valorPesquisa)
                    const estaNaPosicao = elemento.posicao.toLowerCase().includes(valorPesquisa)
                    return estaNoNome || estaNaPosicao
                }
            );

            conteudo.innerHTML = '';

            filtrado.forEach(
                (atleta) => (
                    conteudo.appendChild(montaCartao(atleta))
                )
            );
        } else if (valorPesquisa.length === 0) {
            dados.forEach(
                (atleta) => (
                    conteudo.appendChild(montaCartao(atleta))
                )
            );
        }
    };

    const pegaDados = async (caminho) => {
        const conteudo = document.getElementById('conteudo'); 
        
        try {
            const resposta = await fetch(caminho);
            
            if (resposta.ok) {
                return await resposta.json();
            }
            
            throw new Error('Erro ao buscar dados');
        } catch (error) {
            conteudo.textContent = 'Erro ao carregar dados.';
            console.error(error);
        }
    };

    
    const switchToSelect = () => {

        const isSmallScreen = window.innerWidth < 768;
        if (isSmallScreen) {
            const select = document.createElement('select');
            select.id = 'filterSelect';
            const vazio = new Option("Escolha o elenco",'vazio')
            const optionMasculino = new Option('Masculino', 'masculino');
            const optionFeminino = new Option('Feminino', 'feminino');
            const optionTodos = new Option('Elenco Completo', 'all');
            select.add(vazio)
            select.add(optionMasculino);
            select.add(optionFeminino);
            select.add(optionTodos);

            select.onchange = () => {
                const value = select.value;
                if (value === 'masculino') {
                    atualizarPesquisa("https://botafogo-atletas.mange.li/2024-1/masculino", PesquisaMasculino);
                } else if (value === 'feminino') {
                    atualizarPesquisa("https://botafogo-atletas.mange.li/2024-1/feminino", PesquisaFeminino);
                } else if (value === 'all') {
                    atualizarPesquisa("https://botafogo-atletas.mange.li/2024-1/all", PesquisaTodos);
                }
            };

            divBotoes.innerHTML = ''; 
            divBotoes.appendChild(select); 

        } else {
           
            divBotoes.innerHTML = '';
            divBotoes.appendChild(PesquisaMasculino);
            divBotoes.appendChild(PesquisaFeminino);
            divBotoes.appendChild(PesquisaTodos);
        }
    };

    window.addEventListener('resize', switchToSelect);  
    switchToSelect(); 

} else {
    document.body.innerHTML = `
    <body id = "BodyEstilizado">
        <div id="inicial">
            <div id="inicial-title">
                <h2 id = "tituloLogin">Atletas do Botafogo em 2024-1</h2> 
                <p id = "legenda"><strong>Criado com objetivos exclusivamente didáticos para a <br> disciplina Desenvolvimento Web do Ibmec Rio.<strong></p>
                <img id = "HeaderEscudo" src="escudo.png" alt="escudobotafogo">
            </div>
            <div id ="forms">
                <form>
                    <input id="senha" class="SenhaUsuario" name="password" placeholder="Informe a senha."/>  
                    <input id="Entrar" type="submit" name="submit" value="Entrar" />
                    <p id="senhaSite"><b> A senha é: BotafogoSempre</b></p>
                </form>
            </div>
        </div>
    <body>
    `;

    document.getElementById('Entrar').onclick = () => {
        const entradaSenha = document.getElementById('senha').value;

        if (hex_sha256(entradaSenha) === SenhaLonga ){
            localStorage.setItem('logado',1);
            window.location.href = 'index.html';
        } else {
            alert('Senha incorreta');
        }
    }
}

export default SenhaLonga;