document.addEventListener('DOMContentLoaded', function() {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Função para obter uma URL de imagem aleatória da pasta
    function getRandomImageUrl(basePath, prefix, minNumber, maxNumber, extension) {
        // Gera um número aleatório entre minNumber e maxNumber (inclusive)
        var randomNumber = getRandomInt(minNumber, maxNumber);
        // Retorna a URL completa da imagem aleatória
        return basePath + '/' + prefix + randomNumber + '.' + extension;
    }

    // Seleciona todas as imagens com as classes 'jujutsu-imagem' e 'chainsaw-imagem'
    var jujutsuImages = document.querySelectorAll('.jujutsu-imagem');
    var chainsawImages = document.querySelectorAll('.chainsaw-imagem');
    var bluelockImages = document.querySelectorAll('.bluelock-imagem');
    var hokkaidoImages = document.querySelectorAll('.hokkaido-imagem');
    var dressupImages = document.querySelectorAll('.dressup-imagem');
    var nagatoroImages = document.querySelectorAll('.nagatoro-imagem');
    var kanojoImages = document.querySelectorAll('.kanojo-imagem');

    // Para cada imagem, define uma URL de imagem aleatória
    jujutsuImages.forEach(function(image) {
        image.src = getRandomImageUrl('/jujutsu/capas', 'volume_', 0, 26, 'png');
    });

    chainsawImages.forEach(function(image) {
        image.src = getRandomImageUrl('/chainsaw/capas', 'volume_', 1, 17, 'png');
    });

    bluelockImages.forEach(function(image) {
        image.src = getRandomImageUrl('/bluelock/capas', 'volume_', 1, 28, 'png');
    });

    hokkaidoImages.forEach(function(image) {
        image.src = getRandomImageUrl('/hokkaido/capas', 'volume_', 1, 12, 'png');
    });

    dressupImages.forEach(function(image) {
        image.src = getRandomImageUrl('/dressup/capas', 'volume_', 1, 12, 'png');
    });

    nagatoroImages.forEach(function(image) {
        image.src = getRandomImageUrl('/nagatoro/capas', 'volume_', 1, 19, 'png');
    });

    kanojoImages.forEach(function(image) {
        image.src = getRandomImageUrl('/kanojo-mo-kanojo/capas', 'volume_', 1, 16, 'png');
    });

    // Seleciona o container do catálogo
    var catalogo = document.querySelector('.catalogo');

    // Reordena aleatoriamente os mangás dentro do container do catálogo
    shuffleChildren(catalogo);
});

// Função para reordenar aleatoriamente os elementos dentro de um elemento pai
function shuffleChildren(parent) {
    var children = Array.from(parent.children);
    children.forEach(function(child) {
        parent.removeChild(child);
    });
    shuffleArray(children);
    children.forEach(function(child) {
        parent.appendChild(child);
    });
}

// Função para embaralhar os elementos de uma array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}