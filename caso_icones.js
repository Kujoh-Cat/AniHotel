// Verifica se os ícones foram carregados corretamente
document.querySelectorAll('.logo-icon, nav a i').forEach(function(icon) {
    icon.onerror = function() {
        icon.style.display = 'none'; // Oculta o ícone com erro
        icon.nextElementSibling.style.display = 'inline'; // Mostra o texto alternativo
    };
});

// Função para carregar as imagens do capítulo
function carregarImagensCapitulo(configuracoes) {
    // Localize o elemento div.capitulo
    var capituloDiv = document.querySelector('.capitulo');

    // Verifique se o elemento foi encontrado
    if (capituloDiv) {
        // Obter a quantidade de imagens na pasta
        obterQuantidadeImagens(configuracoes.numeroCapitulo)
            .then(function(quantidade) {
                // Limitar a quantidade máxima de imagens para 30
                quantidade = Math.min(quantidade, 30);

                // Crie um loop para adicionar imagens
                for (var i = 1; i <= quantidade; i++) {
                    // Crie um novo elemento img
                    var novaImg = document.createElement('img');

                    // Defina o atributo src para o caminho da imagem
                    novaImg.src = obterCaminhoImagem(i);

                    // Adicione um manipulador de eventos para o evento 'error'
                    novaImg.addEventListener('error', function(event) {
                        // Verificar se o erro está relacionado a uma imagem (jpg)
                        if (event.target.tagName.toLowerCase() === 'img') {
                            // Remover a imagem corrompida do DOM
                            event.target.remove();
                        }
                    });

                    // Adicione a nova imagem ao elemento div.capitulo
                    capituloDiv.appendChild(novaImg);
                }
            })
            .catch(function(error) {
                console.error("Erro ao carregar imagens do capítulo:", error);
            });
    } else {
        console.error("Div '.capitulo' não encontrada.");
    }
}

// Função para obter a quantidade de imagens na pasta do capítulo
function obterQuantidadeImagens(numeroCapitulo) {
    return Promise.resolve(30); // Simula a obtenção da quantidade de imagens como 30
}

// Função para obter o caminho da imagem do capítulo
function obterCaminhoImagem(indice) {
    // Formatar o índice da imagem com zeros à esquerda se necessário
    var indiceFormatado = indice.toString().padStart(2, '0');
    return indiceFormatado;
}

// Chamada da função para carregar as imagens do capítulo
carregarImagensCapitulo(configuracoes);
