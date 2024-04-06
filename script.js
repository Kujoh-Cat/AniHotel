// Definir o índice inicial do slide
let slideIndex = 0;

// Obter os slides e os dots
const slides = document.querySelectorAll(".mySlides");
const dots = document.querySelectorAll(".dot");
let interval;

// Iniciar o slideshow ao carregar a página
showSlides();

// Função principal para controlar o slideshow
function showSlides() {
    // Ocultar todos os slides e remover a classe "active" dos dots
    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));
    
    // Exibir o slide atual e adicionar a classe "active" ao dot correspondente
    slides[slideIndex].style.display = "block";  
    dots[slideIndex].classList.add("active");
    
    // Agendar a próxima mudança de slide após 5 segundos
    interval = setTimeout(() => {
        plusSlides(1);
    }, 5000);
}

// Função para avançar ou retroceder nos slides
function plusSlides(n) {
    // Limpar o intervalo atual
    clearTimeout(interval);
    
    // Atualizar o índice do slide
    slideIndex += n;
    
    // Verificar limites do índice do slide
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    
    // Exibir o slide correspondente
    showSlides();
}

// Função para exibir um slide específico
function currentSlide(n) {
    // Limpar o intervalo atual
    clearTimeout(interval);
    
    // Atualizar o índice do slide
    slideIndex = n;
    
    // Exibir o slide correspondente
    showSlides();
}

// Atribuir eventos de clique aos dots
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlide(index);
    });
});

// Iniciar o intervalo do slideshow ao carregar a página
showSlides();

// Atrasar a passagem automática após interferência da pessoa
function delayAutoSlide() {
    setTimeout(() => {
        if (interval) {
            clearTimeout(interval);
        }
        interval = setTimeout(() => {
            plusSlides(1);
        }, 8000);
    }, 3000);
}