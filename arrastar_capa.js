// Função para atualizar a capa do volume selecionado
function atualizarCapaVolume() {
    // Obtém o valor selecionado no seletor de volumes
    var selectedVolume = parseInt(document.getElementById("volume").value);

    // Obtém o número máximo de volumes do seletor
    var maxVolume = document.getElementById("volume").options.length;

    // Verifica se o volume selecionado é maior que o máximo
    if (selectedVolume > maxVolume) {
        selectedVolume = 1; // Volta para o primeiro volume
    } else if (selectedVolume < 1) {
        selectedVolume = maxVolume; // Vai para o último volume
    }

// Adiciona um ouvinte de eventos para o seletor de volumes
document.getElementById("volume").addEventListener("change", function() {
    atualizarCapaVolume();
});

// Adiciona um ouvinte de eventos para permitir arrastar a capa para o próximo e o volume anterior
var volumeContainer = document.querySelector(".volume-container");
var touchStartX;
var touchEndX;
volumeContainer.addEventListener("touchstart", function(event) {
    touchStartX = event.touches[0].clientX;
});
volumeContainer.addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].clientX;
    var diff = touchStartX - touchEndX;
    if (diff > 100) { // Defina a sensibilidade do arrasto para o próximo volume
        // Avançar para o próximo volume
        var currentVolume = parseInt(document.getElementById("volume").value);
        var nextVolume = currentVolume + 1;
        var maxVolume = document.getElementById("volume").options.length;
        if (nextVolume > maxVolume) {
            nextVolume = 1;
        }
        document.getElementById("volume").value = nextVolume;
        atualizarCapaVolume();
    } else if (diff < -100) { // Defina a sensibilidade do arrasto para o volume anterior
        // Voltar para o volume anterior
        var currentVolume = parseInt(document.getElementById("volume").value);
        var prevVolume = currentVolume - 1;
        var maxVolume = document.getElementById("volume").options.length;
        if (prevVolume < 1) {
            prevVolume = maxVolume;
        }
        document.getElementById("volume").value = prevVolume;
        atualizarCapaVolume();
    }
});

// Chama a função para atualizar a capa do volume quando a página carregar
window.onload = function() {
    // Verifica se há um volume selecionado armazenado no localStorage para esta página específica
    var pageIdentifier = window.location.pathname; // Obtém o caminho da URL da página
    var storedVolume = localStorage.getItem("selectedVolume_" + pageIdentifier);
    if (storedVolume) {
        // Define o volume selecionado no seletor de volumes
        document.getElementById("volume").value = storedVolume;
    } else {
        // Caso não haja nada salvo, o volume padrão será o Volume 1
        document.getElementById("volume").value = "1";
    }
    // Atualiza a capa do volume
    atualizarCapaVolume();
}
};