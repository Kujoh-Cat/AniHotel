$(document).ready(function() {
    var lastScrollTop; // Última posição de rolagem salva
    var scrollCheckInterval = 50; // Intervalo de verificação da posição de rolagem (em milissegundos)
    var maxScrollAttempts = 20; // Número máximo de tentativas de rolagem
    var maxScrollPosition; // Posição máxima de rolagem

    // Função para calcular a posição máxima de rolagem
    function calculateMaxScrollPosition() {
        maxScrollPosition = $(document).height() - $(window).height();
    }

    // Função para criptografar os dados
    function encryptData(data) {
        // Aqui você pode implementar sua lógica de criptografia
        // Por exemplo, você pode usar uma biblioteca de criptografia como CryptoJS
        // Neste exemplo simples, apenas retornamos os dados como estão
        return data;
    }

    // Função para descriptografar os dados
    function decryptData(data) {
        // Aqui você pode implementar sua lógica de descriptografia
        // Por exemplo, você pode usar a mesma biblioteca de criptografia
        // Neste exemplo simples, apenas retornamos os dados como estão
        return data;
    }

    // Função para salvar a posição de rolagem criptografada no localStorage
    function saveScrollPosition(scrollTop) {
        try {
            // Salva a posição criptografada no localStorage do HTML atual
            var encryptedScrollTop = encryptData(scrollTop.toString());
            localStorage.setItem(getStorageKey(), encryptedScrollTop);
            lastScrollTop = scrollTop;
        } catch (error) {
            console.error("Erro ao salvar o estado da página:", error);
        }
    }

    // Função para carregar a posição de rolagem descriptografada do localStorage
    function loadScrollPosition() {
        try {
            // Obtém a posição vertical salva do localStorage do HTML atual
            var encryptedScrollTop = localStorage.getItem(getStorageKey());
            var decryptedScrollTop = encryptedScrollTop ? decryptData(encryptedScrollTop) : null;
            return decryptedScrollTop ? parseInt(decryptedScrollTop) : null;
        } catch (error) {
            console.error("Erro ao carregar o estado da página:", error);
            return null;
        }
    }

    // Função para restaurar a posição de rolagem
    function restoreScrollPosition() {
        var savedScrollTop = loadScrollPosition();
        if (savedScrollTop !== null) {
            // Rola a página para a posição salva
            window.scrollTo(0, savedScrollTop);
            lastScrollTop = savedScrollTop;
        }
    }

    // Verifica a posição de rolagem a cada intervalo curto de tempo
    function checkScrollPosition() {
        var attempts = 0;
        var savedScrollTop = loadScrollPosition();

        var checkInterval = setInterval(function() {
            if (attempts >= maxScrollAttempts) {
                clearInterval(checkInterval);
                return;
            }

            var currentScrollTop = $(window).scrollTop();
            if (currentScrollTop === savedScrollTop) {
                clearInterval(checkInterval);
                return;
            }

            window.scrollTo(0, savedScrollTop);
            attempts++;
        }, scrollCheckInterval);
    }

    // Função para obter a chave de armazenamento específica para esta página HTML
    function getStorageKey() {
        return 'lastScrollTop_' + window.location.pathname;
    }

    // Chama a função para restaurar e verificar a posição de rolagem ao entrar no site
    restoreScrollPosition();
    checkScrollPosition();

    // Salva o estado da página sempre que houver uma mudança na posição de rolagem
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        saveScrollPosition(scrollTop);
    });

    // Limpa a posição de rolagem ao sair da página
    $(window).on('beforeunload', function() {
        calculateMaxScrollPosition();
        if (lastScrollTop === 0 || lastScrollTop === maxScrollPosition) {
            localStorage.removeItem(getStorageKey());
        } else if (lastScrollTop !== undefined) {
            localStorage.setItem(getStorageKey(), encryptData(lastScrollTop.toString()));
        }
    });

    // Recalcula a posição máxima de rolagem ao redimensionar a janela
    $(window).on('resize', function() {
        calculateMaxScrollPosition();
    });

    // Calcula a posição máxima de rolagem ao carregar a página
    calculateMaxScrollPosition();
});