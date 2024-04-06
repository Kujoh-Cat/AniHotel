// Função para processar uma imagem individualmente
async function processImage(img) {
    // Verifica se o src da imagem começa com "data:," ou se ocorreu um erro ao carregar a imagem
    if (img.src.startsWith("data:,") || !img.complete || !img.naturalWidth) {
        // Se o src for "data:," ou se ocorreu um erro ao carregar a imagem, retorna sem processamento
        return;
    }

    var maxWidth = window.innerWidth; // largura máxima da janela do navegador
    var maxHeight = window.innerHeight; // altura máxima da janela do navegador
    var widthRatio = maxWidth / img.width; // proporção de largura
    var heightRatio = maxHeight / img.height; // proporção de altura
    var scale = Math.min(widthRatio, heightRatio); // escala para ajustar a imagem

    // Define as dimensões do canvas
    var canvas = document.createElement('canvas');
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    // Desenha a imagem no canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    try {
        // Converte o canvas para uma representação base64 da imagem no formato PNG
        var dataURL = canvas.toDataURL('image/png');
        // Define o src da imagem como a representação base64
        img.src = dataURL;
    } catch (error) {
        // Se ocorrer um erro ao converter para PNG, mantém a imagem original
        console.error("Erro ao converter para PNG:", error);
    }
}

// Função para processar todas as imagens gradualmente
async function processAllImagesGradually() {
    // Seleciona todas as imagens dentro da classe .capitulo
    var images = document.querySelectorAll('.capitulo img');

    // Define um intervalo de tempo entre o processamento de cada imagem
    var delay = 100; // 1 segundo
    var currentIndex = 0;

    // Função recursiva para processar as imagens gradualmente
    async function processNextImage() {
        if (currentIndex < images.length) {
            await processImage(images[currentIndex]);
            currentIndex++;
            setTimeout(processNextImage, delay);
        }
    }

    // Inicia o processamento gradual das imagens
    processNextImage();
}

// Chama a função para processar todas as imagens gradualmente ao entrar no site
processAllImagesGradually();