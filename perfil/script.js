document.addEventListener('DOMContentLoaded', function() {
    const fotoInput = document.getElementById('foto');
    const nomeInput = document.getElementById('nome');
    const bioInput = document.getElementById('bio');
    const perfil = document.getElementById('perfil');
    let perfilData = JSON.parse(localStorage.getItem('perfil')) || {};

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
                fadeIn(perfil, dataURL); // Aplica fadeIn para a nova imagem
                if (perfilData.perfilFoto2) {
                    perfilData.perfilFoto = perfilData.perfilFoto2;
                }
                perfilData.perfilFoto2 = dataURL;
                localStorage.setItem('perfil', JSON.stringify(perfilData));
                carregarDados(); // Carrega os dados salvos localmente imediatamente após adicionar a imagem
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
        if (perfilData.perfilFoto) {
            perfil.style.backgroundImage = `url(${perfilData.perfilFoto})`;
            perfil.style.opacity = '1';
            if (!perfilData.perfilFoto2) { // Verifica se não há uma segunda imagem definida
                perfil.style.filter = ''; // Remove o filtro de brilho se não houver imagem padrão
            }
        } else {
            if (!perfilData.perfilFoto2) { // Verifica se não há nenhuma imagem definida
                perfil.style.backgroundImage = `url('/img/perfil_padrao.png')`;
                perfil.style.opacity = '0.5';
                perfil.style.filter = 'brightness(50%)';
            }
        }
        
        nomeInput.value = perfilData.perfilNome || '';
        bioInput.value = perfilData.perfilBio || '';
    }

    // Função para salvar dados localmente
    function salvarDadosLocalmente(dados) {
        perfilData = {...perfilData, ...dados};
        localStorage.setItem('perfil', JSON.stringify(perfilData));
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
                fadeIn(perfil, dataURL); // Aplica fadeIn para a nova imagem
                if (perfilData.perfilFoto2) {
                    perfilData.perfilFoto = perfilData.perfilFoto2;
                }
                perfilData.perfilFoto2 = dataURL;
                localStorage.setItem('perfil', JSON.stringify(perfilData));
                carregarDados(); // Carrega os dados salvos localmente imediatamente após adicionar a imagem
            };
            reader.readAsDataURL(file);
        }
    });

    // Evento de deslize para alternar entre as imagens
    perfil.addEventListener('touchstart', function(event) {
        const initialX = event.touches[0].clientX;
        
        perfil.addEventListener('touchend', function(event) {
            const currentX = event.changedTouches[0].clientX;
            const diffX = initialX - currentX;

            if (Math.abs(diffX) > 50) { // Define um limite de 50 pixels para considerar como deslize
                if (diffX > 0) {
                    // Deslize para a esquerda
                    if (perfilData.perfilFoto2) {
                        perfil.style.backgroundImage = `url(${perfilData.perfilFoto2})`; // Altera a imagem instantaneamente
                        [perfilData.perfilFoto, perfilData.perfilFoto2] = [perfilData.perfilFoto2, perfilData.perfilFoto]; // Troca as imagens
                        localStorage.setItem('perfil', JSON.stringify(perfilData));
                    }
                } else {
                    // Deslize para a direita
                    if (perfilData.perfilFoto) {
                        perfil.style.backgroundImage = `url(${perfilData.perfilFoto})`; // Altera a imagem instantaneamente
                        [perfilData.perfilFoto, perfilData.perfilFoto2] = [perfilData.perfilFoto2, perfilData.perfilFoto]; // Troca as imagens
                        localStorage.setItem('perfil', JSON.stringify(perfilData));
                    }
                }
            }
        });
    });

    // Função para aplicar fadeIn em um elemento com uma nova imagem
    function fadeIn(elemento, novaImagem) {
        elemento.style.transition = 'none'; // Remove a transição para uma troca instantânea
        elemento.style.opacity = '0'; // Define a opacidade como 0 para iniciar o efeito de fadeIn
        setTimeout(function() {
            elemento.style.backgroundImage = `url(${novaImagem})`; // Define a nova imagem de fundo
            elemento.style.opacity = '1'; // Define a opacidade como 1 após um curto atraso
            if (!perfilData.perfilFoto2) { // Verifica se não há uma segunda imagem definida
                elemento.style.filter = ''; // Remove o filtro de brilho se não houver imagem padrão
            }
        }, 1); // 1 milissegundo para uma troca instantânea
        setTimeout(function() {
            elemento.style.transition = ''; // Restaura a transição após o fadeIn
        }, 1); // 1 milissegundo após o fadeIn
    }
});
