document.addEventListener('DOMContentLoaded', function() {
    // Verifica se a navegação inferior já existe no documento
    var bottomNavigationExists = document.querySelector('.bottom-navigation');

    // Se a navegação inferior não existir, adiciona manualmente abaixo da seção
    if (!bottomNavigationExists) {
        // Encontra a seção
        var section = document.querySelector('section');

        // Verifica se a seção foi encontrada
        if (section) {
            // Cria a navegação inferior
            var bottomNavigation = document.createElement('nav');
            bottomNavigation.classList.add('bottom-navigation');

            // Cria a div de ícones de navegação
            var navigationIconsDiv = document.createElement('div');
            navigationIconsDiv.classList.add('navigation-icons');
            navigationIconsDiv.id = 'nav_ico-baixo';

            // Adiciona os links de navegação à div de ícones de navegação
            var navigationLinks = document.querySelectorAll('nav .navigation-icons a');
            navigationLinks.forEach(function(link) {
                var clonedLink = link.cloneNode(true);
                navigationIconsDiv.appendChild(clonedLink);
            });

            // Adiciona a div de ícones de navegação à navegação inferior
            bottomNavigation.appendChild(navigationIconsDiv);

            // Insere a navegação inferior após a seção
            section.parentNode.insertBefore(bottomNavigation, section.nextSibling);
        } else {
            console.error('Seção não encontrada no documento.');
        }
    } else {
        console.log('Navegação inferior já existe no documento. Nenhuma ação necessária.');
    }
});