self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    if (url.pathname.endsWith('.mp3')) {
        event.respondWith(
            caches.open('audio-cache').then(cache => {
                return cache.match(event.request).then(response => {
                    return (
                        response ||
                        fetch(event.request).then(response => {
                            cache.put(event.request, response.clone());
                            return response;
                        })
                    );
                });
            }).catch(error => {
                console.error('Error in event.respondWith:', error);
            })
        );
    }
});
