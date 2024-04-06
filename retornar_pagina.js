$(document).ready(function() {
    // Função para salvar o estado da página
    function savePageState() {
        try {
            // Obtém a posição vertical atual da página
            var scrollTop = $(window).scrollTop();
            // Salva a posição no localStorage
            localStorage.setItem('lastScrollTop', scrollTop);
        } catch (error) {
            console.error("Erro ao salvar o estado da página:", error);
        }
    }

    // Função para carregar o estado da página
    function loadPageState() {
        try {
            // Obtém a posição vertical salva do localStorage
            var scrollTop = localStorage.getItem('lastScrollTop');
            return scrollTop ? parseInt(scrollTop) : null;
        } catch (error) {
            console.error("Erro ao carregar o estado da página:", error);
            return null;
        }
    }

    // Função para rolar a página para a posição salva
    function scrollToSavedPosition() {
        // Obtém a posição salva
        var savedScrollTop = loadPageState();
        // Se houver uma posição salva
        if (savedScrollTop !== null) {
            // Rola a página para a posição salva
            $(window).scrollTop(savedScrollTop);
        }
    }

    // Chama a função para rolar a página para a posição salva ao entrar no site
    scrollToSavedPosition();

    // Salva o estado da página sempre que houver uma mudança na posição de rolagem
    $(window).on('scroll', function() {
        savePageState();
    });
});