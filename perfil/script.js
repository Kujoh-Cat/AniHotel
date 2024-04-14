document.addEventListener('DOMContentLoaded', function() {
    const fotoInput = document.getElementById('foto');
    const nomeInput = document.getElementById('nome');
    const bioInput = document.getElementById('bio');
    const perfil = document.getElementById('perfil');

    // Carregar dados salvos localmente
    carregarDados();

    // Evento de clique na imagem de perfil para acionar o clique no input de arquivo
    perfil.addEventListener('click', function() {
        fotoInput.click();
    });

    // Evento de alteração no input de arquivo para carregar a foto
    fotoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const dataURL = e.target.result;
                perfil.style.backgroundImage = `url(${dataURL})`;
                perfil.style.opacity = '1'; // Definindo a opacidade para 1 quando uma imagem é carregada
                perfil.style.filter = ''; // Removendo o filtro de brilho
                salvarDadosLocalmente({perfilFoto: dataURL});
            };
            reader.readAsDataURL(file);
        }
    });

    // Evento de alteração nos inputs de nome e bio para salvar localmente
    nomeInput.addEventListener('input', function() {
        salvarDadosLocalmente({perfilNome: nomeInput.value});
    });

    bioInput.addEventListener('input', function() {
        salvarDadosLocalmente({perfilBio: bioInput.value});
    });

    // Função para carregar dados salvos localmente
    function carregarDados() {
        const perfilData = JSON.parse(localStorage.getItem('perfil'));
        if (perfilData) {
            perfil.style.backgroundImage = `url(${perfilData.perfilFoto || '/img/perfil_padrao.png'})`;
            nomeInput.value = perfilData.perfilNome || ''; // Verifica se o nome está definido
            bioInput.value = perfilData.perfilBio || ''; // Verifica se a bio está definida
            if (perfilData.perfilFoto) {
                perfil.style.opacity = '1';
                perfil.style.filter = ''; // Removendo o filtro de brilho
            } else {
                perfil.style.opacity = '0.5';
                perfil.style.filter = 'brightness(50%)'; // Aplicando o filtro de brilho
            }
        } else {
            perfil.style.backgroundImage = `url('/img/perfil_padrao.png')`; // Definindo a imagem padrão
            perfil.style.opacity = '0.5';
            perfil.style.filter = 'brightness(50%)'; // Aplicando o filtro de brilho
        }
    }

    // Função para salvar dados localmente
    function salvarDadosLocalmente(dados) {
        const perfilData = JSON.parse(localStorage.getItem('perfil')) || {};
        localStorage.setItem('perfil', JSON.stringify({...perfilData, ...dados}));
    }

    // Sistema de arrastamento de imagem
    perfil.addEventListener('dragover', function(e) {
        e.preventDefault();
        perfil.classList.add('dragover');
    });

    perfil.addEventListener('dragleave', function() {
        perfil.classList.remove('dragover');
    });

    perfil.addEventListener('drop', function(e) {
        e.preventDefault();
        perfil.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const dataURL = e.target.result;
                perfil.style.backgroundImage = `url(${dataURL})`;
                perfil.style.opacity = '1'; // Definindo a opacidade para 1 quando uma imagem é carregada
                perfil.style.filter = ''; // Removendo o filtro de brilho
                salvarDadosLocalmente({perfilFoto: dataURL});
            };
            reader.readAsDataURL(file);
        }
    });

    // Animação de entrada
    const elementosAnimados = document.querySelectorAll('.animate');
    elementosAnimados.forEach(function(elemento) {
        elemento.style.opacity = 0;
        elemento.style.transform = 'translateY(20px)';
    });

    function fadeIn() {
        elementosAnimados.forEach(function(elemento) {
            elemento.style.animation = 'fadeIn 0.5s forwards';
        });
    }

    fadeIn();

    // Aplicar object-fit: cover e object-position: center a todas as imagens da miniatura
    const imagensMiniatura = document.querySelectorAll('#perfil-thumbnail img');
    imagensMiniatura.forEach(function(img) {
        img.style.objectFit = 'cover';
        img.style.objectPosition = 'center';
    });
});

// Função para processar a imagem de perfil com os ajustes desejados e convertê-la para PNG
async function processarImagem(imagem, qualidade, contraste, saturacao) {
    // Cria um canvas para manipular a imagem
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Define as dimensões do canvas para as dimensões da imagem
    canvas.width = imagem.width;
    canvas.height = imagem.height;

    // Desenha a imagem original no canvas
    ctx.drawImage(imagem, 0, 0);

    // Aplica o ajuste de contraste
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ajustarContraste(imageData.data, contraste);
    ctx.putImageData(imageData, 0, 0);

    // Aplica o ajuste de saturação
    await ajustarSaturacao(canvas, saturacao);

    // Converte o canvas para uma imagem com qualidade máxima e formato PNG
    return new Promise(resolve => {
        canvas.toBlob(blob => {
            resolve(blob);
        }, 'image/png', qualidade);
    });
}