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
            carregarImagem(file);
        }
    });

    // Evento de alteração nos inputs de nome e bio para salvar localmente
    nomeInput.addEventListener('input', salvarNomeLocalmente);
    bioInput.addEventListener('input', salvarBioLocalmente);

    // Função para carregar dados salvos localmente
    function carregarDados() {
        const perfilData = JSON.parse(localStorage.getItem('perfil'));
        if (perfilData) {
            perfil.style.backgroundImage = `url(${perfilData.perfilFoto || '/img/perfil_padrao.png'})`;
            nomeInput.value = perfilData.perfilNome || ''; // Verifica se o nome está definido
            bioInput.value = perfilData.perfilBio || ''; // Verifica se a bio está definida
            atualizarEstiloPerfil(perfilData.perfilFoto);
        } else {
            perfil.style.backgroundImage = `url('/img/perfil_padrao.png')`; // Definindo a imagem padrão
            perfil.style.opacity = '0.5';
            perfil.style.filter = 'brightness(50%)'; // Aplicando o filtro de brilho
        }
    }

    // Função para salvar o nome localmente
    function salvarNomeLocalmente() {
        const nome = nomeInput.value.trim();
        salvarDadosLocalmente({perfilNome: nome});
    }

    // Função para salvar a bio localmente
    function salvarBioLocalmente() {
        const bio = bioInput.value.trim();
        salvarDadosLocalmente({perfilBio: bio});
    }

    // Função para salvar dados localmente
    function salvarDadosLocalmente(dados) {
        const perfilData = JSON.parse(localStorage.getItem('perfil')) || {};
        localStorage.setItem('perfil', JSON.stringify({...perfilData, ...dados}));
    }

    // Função para carregar uma imagem
    function carregarImagem(file) {
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
            carregarImagem(file);
        }
    });

    // Animação de fade
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

    // Função para atualizar o estilo do perfil
    function atualizarEstiloPerfil(perfilFoto) {
        if (perfilFoto) {
            perfil.style.opacity = '1';
            perfil.style.filter = ''; // Removendo o filtro de brilho
        } else {
            perfil.style.opacity = '0.5';
            perfil.style.filter = 'brightness(50%)'; // Aplicando o filtro de brilho
        }
    }

    // Evento de colagem de imagem no nome ou na bio
    nomeInput.addEventListener('paste', function(event) {
        processarColagemImagem(event, nomeInput);
    });

    bioInput.addEventListener('paste', function(event) {
        processarColagemImagem(event, bioInput);
    });

    // Função para processar a colagem de imagem
    function processarColagemImagem(event, input) {
        event.preventDefault();
        const clipboardData = event.clipboardData || window.clipboardData;
        const items = clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                const reader = new FileReader();
                reader.onload = function(event) {
                    const imageUrl = event.target.result;
                    input.value = ''; // Limpa o campo de entrada para evitar a exibição do link
                    carregarImagemUrl(imageUrl);
                };
                reader.readAsDataURL(blob);
            }
        }
    }

    // Função para carregar uma imagem a partir de uma URL
    function carregarImagemUrl(imageUrl) {
        const image = new Image();
        image.onload = function() {
            perfil.style.backgroundImage = `url(${imageUrl})`;
            perfil.style.opacity = '1'; // Definindo a opacidade para 1 quando uma imagem é carregada
            perfil.style.filter = ''; // Removendo o filtro de brilho
            salvarDadosLocalmente({perfilFoto: imageUrl});
        };
        image.onerror = function() {
            console.error('Erro ao carregar a imagem da URL:', imageUrl);
            alert('Erro ao carregar a imagem da URL. Certifique-se de que o link direciona para uma imagem válida.');
        };
        image.src = imageUrl;
    }
});
