const CACHE_NAME = 'site-cache-v1';

// Lista de arquivos a serem armazenados em cache
const urlsToCache = [
  '/',
  'index.html',
  'header.css',
  'script.js',
  'styles.css',
  'info/info.css',
  'info/info.html',
  'info/script.js',
  'img/bluelock.jpg',
  'img/hitori-3.jpg',
  'img/hokkaido.png',
  'img/sonobisque.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
  // Inclua aqui outros recursos que deseja armazenar offline, como os ícones
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptação de solicitações do Service Worker
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna a resposta do cache, se estiver disponível
        if (response) {
          return response;
        }

        // Clona a solicitação para consumir a resposta na rede
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            // Verifica se a resposta é válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona a resposta para armazená-la em cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
      .catch(() => {
        // Se ocorrer um erro ao buscar na rede, retorna uma resposta offline personalizada
        return caches.match('/');
      })
  );
});

// Atualizações automáticas do Service Worker
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});