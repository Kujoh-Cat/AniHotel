// Função para carregar as imagens do capítulo com consideração especial para índices com zero à esquerda
function carregarImagensCapitulo(configuracoes) {
    // Verificar se as configurações especiais são atendidas
    if (verificarConfiguracoesEspeciais(configuracoes)) {
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
                        // Formatar o número do capítulo com zeros à esquerda, se necessário
                        var numeroFormatado = i < 10 ? '0' + i : i;

                        // Crie um novo elemento img
                        var novaImg = document.createElement('img');

                        // Defina o atributo src para o caminho da imagem
                        novaImg.src = obterCaminhoImagem(numeroFormatado, configuracoes);

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
    } else {
        console.log("Não são necessárias configurações especiais para este capítulo.");
    }
}

// Função para obter o caminho da imagem do capítulo
function obterCaminhoImagem(indice, configuracoes) {
    return `/chainsaw_capitulos/Capitulo_${configuracoes.numeroCapitulo}/${indice}.jpg`;
}

// Verificar se as configurações especiais são atendidas
function verificarConfiguracoesEspeciais(configuracoes) {
    var numeroCapitulo = configuracoes.numeroCapitulo;
    var nomeManga = configuracoes.nomeManga;

    // Verificar se o número do capítulo está dentro do intervalo especificado e o nome do manga é "Chainsaw Man"
    if (numeroCapitulo >= 148 && numeroCapitulo <= 159 && nomeManga === "Chainsaw Man") {
        return true;
    } else {
        return false;
    }
                                                             }
