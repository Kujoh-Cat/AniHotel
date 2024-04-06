// Defina a lista de imagens que serão alternadas
var listaImagens = ['/favicons/kaiser.png', '/favicons/marin.png', '/favicons/bachira.png'];

// Função para trocar as imagens aleatórias e adicionar a tag de favicon
function trocarImagensAleatorias() {
    // Verifica se já existe uma tag de link para o favicon no HTML
    if (!document.querySelector('link[rel="shortcut icon"]')) {
        // Cria uma nova tag de link para o favicon
        var faviconLink = document.createElement('link');
        faviconLink.rel = 'shortcut icon';
        document.head.appendChild(faviconLink);
        console.log('Tag de link para o favicon adicionada ao HTML');
    }

    // Seleciona uma imagem aleatória da lista fornecida
    var randomIndex = Math.floor(Math.random() * listaImagens.length);
    var imagem = listaImagens[randomIndex];

    // Pré-carrega a imagem
    var imgPreload = new Image();
    imgPreload.src = imagem;

    console.log('Pré-carregando imagem:', imagem); // Adiciona mensagem de log

    // Atualiza os ícones de compartilhamento
    var metaTagFacebook = document.querySelector('meta[property="og:image"]');
    if (metaTagFacebook) {
        metaTagFacebook.content = imagem;
    }

    var metaTagTwitter = document.querySelector('meta[name="twitter:image"]');
    if (metaTagTwitter) {
        metaTagTwitter.content = imagem;
    }

    console.log('Ícones de compartilhamento atualizados com:', imagem); // Adiciona mensagem de log

    // Atualiza o favicon
    var favicon = document.querySelector('link[rel="shortcut icon"]');
    if (favicon) {
        favicon.href = imagem;
        console.log('Favicon atualizado:', imagem); // Adiciona mensagem de log
    }
}

// Chama a função para trocar as imagens aleatórias e adicionar a tag de favicon
trocarImagensAleatorias();