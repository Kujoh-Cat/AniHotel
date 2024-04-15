// Verifica se os ícones foram carregados corretamente
document.querySelectorAll('.logo-icon, nav a i').forEach(function(icon) {
    icon.onerror = function() {
        icon.style.display = 'none'; // Oculta o ícone com erro
        icon.nextElementSibling.style.display = 'inline'; // Mostra o texto alternativo
    };
});

// Função para formatar números com zeros à esquerda
function formatarNumero(numero, tamanho) {
    var numeroFormatado = String(numero);
    var numeroSemZeros = parseInt(numeroFormatado, 10).toString(); // Remover zeros à esquerda
    var zerosEsquerda = numeroFormatado.length - numeroSemZeros.length; // Contar zeros à esquerda
    if (zerosEsquerda > 0) {
        return numeroFormatado; // Se já tiver zeros à esquerda, retornar o número formatado original
    } else {
        while (numeroFormatado.length < tamanho) {
            numeroFormatado = '0' + numeroFormatado;
        }
        return numeroFormatado;
    }
}

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
                    // Formatar o número do capítulo com zeros à esquerda
                    var numeroCapituloFormatado = formatarNumero(i, 2);

                    // Crie um novo elemento img
                    var novaImg = document.createElement('img');

                    // Defina o atributo src para o caminho da imagem
                    novaImg.src = obterCaminhoImagem(numeroCapituloFormatado, configuracoes);

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
