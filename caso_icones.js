// Verifica se os ícones foram carregados corretamente
document.querySelectorAll('.logo-icon, nav a i').forEach(function(icon) {
    icon.onerror = function() {
        icon.style.display = 'none'; // Oculta o ícone com erro
        icon.nextElementSibling.style.display = 'inline'; // Mostra o texto alternativo
    };
});