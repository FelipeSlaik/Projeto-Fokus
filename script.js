//Buscando e ALterando cor de Fundo da Página
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const starPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const musicaFocoInput = document.querySelector('#alternar-musica');
const imgPausePlay = document.querySelector('.app__card-primary-butto-icon');
const tempoVisivel = document.querySelector('#timer');

const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somFinal = new Audio('/sons/beep.mp3');
const musica = new Audio('/sons/luna-rise-part-one.mp3');

let tempoDecorridoEmSegundos = 1500 //temporizador
let intervaloId = null;

musica.loop = true;
somPlay.pause = true;

//Adicionando musica ao usar botão
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})
/////////////////////// Temas //////////////////

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo()
    //Array de botões
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    //////////////////
    html.setAttribute('data-contexto', contexto);//alterando cor de fundo

    banner.setAttribute('src', `/imagens/${contexto}.png`); //alterando imagem de fundo

    //alterando textos do titulo
    switch (contexto) {
        case "foco":
            title.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            title.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            title.innerHTML = `
                Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
                `
        default:
            break;

    }
}
//Decrementando a contagem e iniciando Temporizador e Interrompendo 
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somFinal.play(); //Som ao Terminar o Tempo
        alert('Tempo finalizado!');
        zerar();
        tempoDecorridoEmSegundos = 5;
        return
    }


    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

starPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        somPause.play(); //som ao Pausar
        zerar();
        return
    }
    somPlay.play(); //Som ao iniciar
    intervaloId = setInterval(contagemRegressiva, 1000);
    //alterando texto do botão
    iniciarOuPausarBt.textContent = "Pausar";
    imgPausePlay.setAttribute('src', '/imagens/pause.png');//trocando icone do botão
}

function zerar() {
    clearInterval(intervaloId);
    //alterando o texto do botão
    iniciarOuPausarBt.textContent = "Começar";
    imgPausePlay.setAttribute('src', '/imagens/play_arrow.png');//trocando icone do botão
    intervaloId = null
}

//Adicionando Temporizador Na Tela
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' });
    tempoVisivel.innerHTML = `${tempoFormatado}`;
}

mostrarTempo()
