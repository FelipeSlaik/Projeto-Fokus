//Buscando e ALterando cor de Fundo da Página
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

//Adicionando musica ao usar botão
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})
///////////////////////

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
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
