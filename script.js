// Definir um array com os slides aleatórios
const slides = [
    { src: "/img/Hokkaido-1.jpg", alt: "Hokkaido Gals Are Super Adorable!", url: "/hokkaido/selecionar.html" },
    { src: "/img/sonobisque.jpg", alt: "My Dress-Up Darling", url: "/dressup/selecionar.html" },
    { src: "/img/bluelock.jpg", alt: "Blue Lock", url: "/bluelock/selecionar.html" },
    { src: "/img/chainsaw_man.png", alt: "Chainsaw Man", url: "/chainsaw/selecionar.html" },
    { src: "/img/jujutsu_kaisen.png", alt: "Jujutsu Kaisen", url: "/jujutsu/selecionar.html" },
    { src: "/img/berserk_2.png", alt: "Berserk", url: "/berserk/selecionar.html" }
];

// Embaralhar os slides aleatórios
const shuffledSlides = slides.sort(() => Math.random() - 0.5);

// Obter o container do slideshow
const container = document.getElementById("slideshow-container");

// Criar os elementos de slide e adicioná-los ao container
shuffledSlides.forEach(slide => {
    const slideElement = document.createElement("div");
    slideElement.classList.add("mySlides", "fade");
    slideElement.innerHTML = `
        <a href="${slide.url}">
            <img src="${slide.src}" alt="${slide.alt}" style="width: 100%;">
        </a>
    `;
    container.appendChild(slideElement);
});

// Obter os slides
const slidesDOM = document.querySelectorAll(".mySlides");
let interval;

// Definir o índice inicial do slide
let slideIndex = 0;
let previousIndex = slides.length - 1; // Índice do slide anterior

// Função principal para controlar o slideshow
function showSlides() {
    // Ocultar todos os slides, exceto o slide atual
    slidesDOM.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? "block" : "none";
    });

    // Agendar a próxima mudança de slide após 5 segundos
    interval = setTimeout(() => {
        plusSlides(1);
    }, 5000);
}

// Função para avançar ou retroceder nos slides
function plusSlides(n) {
    // Limpar o intervalo atual
    clearTimeout(interval);

    // Atualizar o índice do slide anterior
    previousIndex = slideIndex;

    // Escolher aleatoriamente o próximo slide
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * slides.length);
    } while (nextIndex === slideIndex || nextIndex === previousIndex);

    // Atualizar o índice do slide
    slideIndex = nextIndex;

    // Exibir o slide correspondente
    showSlides();
}

// Iniciar o slideshow ao carregar a página
showSlides();

// Atrasar a passagem automática após a interação do usuário
document.addEventListener("mousemove", delayAutoSlide);
document.addEventListener("touchstart", delayAutoSlide);

// Função para atrasar a passagem automática após a interação do usuário
function delayAutoSlide() {
    setTimeout(() => {
        clearTimeout(interval);
        interval = setTimeout(() => {
            plusSlides(1);
        }, 5000);
    }, 2500);
}

// Adicionar tratamento de eventos de arrastar para dispositivos de toque e mouse
let startX;
container.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
});

container.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0].clientX;
    const diffX = endX - startX;
    if (diffX > 25) {
        plusSlides(-1); // Slide para a esquerda
    } else if (diffX < -25) {
        plusSlides(1); // Slide para a direita
    }
});

container.addEventListener("mousedown", (event) => {
    startX = event.clientX;
});

container.addEventListener("mouseup", (event) => {
    const endX = event.clientX;
    const diffX = endX - startX;
    if (diffX > 25) {
        plusSlides(-1); // Slide para a esquerda
    } else if (diffX < -25) {
        plusSlides(1); // Slide para a direita
    }
});