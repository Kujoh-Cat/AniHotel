document.addEventListener('DOMContentLoaded', function() {
    const fotoInput = document.getElementById('foto');
    const nomeInput = document.getElementById('nome');
    const bioInput = document.getElementById('bio');
    const perfil = document.getElementById('perfil');
    const maxFileSizeMB = 10; // Tamanho máximo do arquivo em MB
    const maxVideoSizeMB = 5; // Tamanho máximo do vídeo em MB
    let perfilData = JSON.parse(localStorage.getItem('perfil')) || {};

    // Carregar dados salvos localmente
    carregarDados();

    // Evento de clique na imagem de perfil para acionar o clique no input de arquivo
    perfil.addEventListener('click', function() {
        fotoInput.click();
    });

    // Evento de alteração no input de arquivo para carregar a foto ou vídeo
    fotoInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.size > maxFileSizeMB * 1024 * 1024) {
                alert('O tamanho do arquivo excede o limite máximo permitido.');
            } else if (isVideo(file)) {
                if (file.size > maxVideoSizeMB * 1024 * 1024) {
                    alert('O tamanho do vídeo excede o limite máximo permitido.');
                } else {
                    carregarVideo(file);
                }
            } else {
                carregarArquivo(file);
            }
        }
    });

    // Evento de alteração nos inputs de nome e bio para salvar localmente
    nomeInput.addEventListener('input', function() {
        if (nomeInput.value.length > 50) { // Limite de 50 caracteres para o nome
            nomeInput.value = nomeInput.value.slice(0, 50);
            alert('O nome deve ter no máximo 50 caracteres.');
        }
        salvarDadosLocalmente({perfilNome: nomeInput.value});
    });

    bioInput.addEventListener('input', function() {
        if (bioInput.value.length > 150) { // Limite de 150 caracteres para a bio
            bioInput.value = bioInput.value.slice(0, 150);
            alert('A bio deve ter no máximo 150 caracteres.');
        }
        salvarDadosLocalmente({perfilBio: bioInput.value});
    });

    // Sistema de arrastamento de arquivo
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
            if (file.size > maxFileSizeMB * 1024 * 1024) {
                alert('O tamanho do arquivo excede o limite máximo permitido.');
            } else if (isVideo(file)) {
                if (file.size > maxVideoSizeMB * 1024 * 1024) {
                    alert('O tamanho do vídeo excede o limite máximo permitido.');
                } else {
                    carregarVideo(file);
                }
            } else {
                carregarArquivo(file);
            }
        }
    });

    // Função para carregar um arquivo (imagem ou vídeo)
    function carregarArquivo(file) {
        if (isImagem(file)) {
            carregarImagem(file);
        } else {
            alert('Formato de arquivo não suportado. Por favor, carregue uma imagem.');
        }
    }

    // Função para carregar um vídeo
    function carregarVideo(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataURL = e.target.result;
            perfil.innerHTML = `<video autoplay loop muted playsinline style="object-fit: cover; object-position: center; width: 100%; height: 100%;"><source src="${dataURL}" type="${file.type}"></video>`;
            salvarNovoVideo(dataURL);
        };
        reader.readAsDataURL(file);
    }

    // Função para verificar se o arquivo é uma imagem
    function isImagem(file) {
        return file.type.startsWith('image/');
    }

    // Função para verificar se o arquivo é um vídeo
    function isVideo(file) {
        return file.type.startsWith('video/');
    }

    // Função para carregar uma imagem
    function carregarImagem(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataURL = e.target.result;
            perfil.style.backgroundImage = `url(${dataURL})`;
            perfil.style.opacity = '1';
            perfil.style.filter = ''; // Remove o filtro de brilho
            salvarNovaImagem(dataURL);
        };
        reader.readAsDataURL(file);
    }

    // Função para salvar uma nova imagem
    function salvarNovaImagem(dataURL) {
        if (perfilData.perfilFoto2) {
            perfilData.perfilFoto = perfilData.perfilFoto2;
        }
        perfilData.perfilFoto2 = dataURL;
        localStorage.setItem('perfil', JSON.stringify(perfilData));
        carregarDados(); // Carrega os dados salvos localmente imediatamente após adicionar a imagem
    }

    // Função para salvar um novo vídeo
    function salvarNovoVideo(dataURL) {
        if (perfilData.perfilFoto2) {
            perfilData.perfilFoto = perfilData.perfilFoto2;
        }
        perfilData.perfilVideo = dataURL;
        localStorage.setItem('perfil', JSON.stringify(perfilData));
        carregarDados(); // Carrega os dados salvos localmente imediatamente após adicionar o vídeo
    }

    // Função para carregar dados salvos localmente
    function carregarDados() {
        if (perfilData.perfilFoto2) {
            perfil.style.backgroundImage = `url(${perfilData.perfilFoto2})`;
            perfil.style.opacity = '1';
            perfil.style.filter = ''; // Remove o filtro de brilho
        } else if (perfilData.perfilVideo) {
            perfil.innerHTML = `<video autoplay loop muted playsinline style="object-fit: cover; object-position: center; width: 100%; height: 100%;"><source src="${perfilData.perfilVideo}" type="video/mp4"></video>`;
        } else {
            perfil.style.backgroundImage = `url('/img/perfil_padrao.png')`;
            perfil.style.opacity = '0.5';
            perfil.style.filter = 'brightness(50%)';
        }
        
        nomeInput.value = perfilData.perfilNome || '';
        bioInput.value = perfilData.perfilBio || '';
    }

    // Função para salvar dados localmente
    function salvarDadosLocalmente(dados) {
        perfilData = {...perfilData, ...dados};
        localStorage.setItem('perfil', JSON.stringify(perfilData));
    }

    // Sistema de deslize para alternar entre as imagens
    let startX;
    perfil.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
    });

    perfil.addEventListener('touchend', function(event) {
        const endX = event.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) { // Define um limite de 50 pixels para considerar como deslize
            if (diffX > 0) {
                // Deslize para a esquerda
                mostrarProximaImagem();
            } else {
                // Deslize para a direita
                mostrarImagemAnterior();
            }
        }
    });

    // Função para mostrar a próxima imagem
    function mostrarProximaImagem() {
        if (perfilData.perfilFoto2) {
            perfil.style.backgroundImage = `url(${perfilData.perfilFoto2})`; // Altera a imagem instantaneamente
            [perfilData.perfilFoto, perfilData.perfilFoto2] = [perfilData.perfilFoto2, perfilData.perfilFoto]; // Troca as imagens
            salvarDadosLocalmente({ perfilFoto: perfilData.perfilFoto, perfilFoto2: perfilData.perfilFoto2 });
        }
    }

    // Função para mostrar a imagem anterior
    function mostrarImagemAnterior() {
        if (perfilData.perfilFoto) {
            perfil.style.backgroundImage = `url(${perfilData.perfilFoto})`; // Altera a imagem instantaneamente
            [perfilData.perfilFoto, perfilData.perfilFoto2] = [perfilData.perfilFoto2, perfilData.perfilFoto]; // Troca as imagens
            salvarDadosLocalmente({ perfilFoto: perfilData.perfilFoto, perfilFoto2: perfilData.perfilFoto2 });
        }
    }
});