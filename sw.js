importScripts('/cache-polyfill.min.js');
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('kplachkov').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/talk/blockchain-plovdev/',
                '/talk/blockchain-plovdev/index.html',
                '/css/style.min.css',
                '/css/academicons.min.css',
                '/css/bootstrap.min.css',
                '/css/font-awesome.min.css',
                '/css/highlight.min.css',
                '/fonts/fontawesome-webfont.woff2?v=4.7.0',
                '/js/academic.js',
                '/js/bootstrap.min.js',
                '/js/highlight.min.js',
                '/js/imagesloaded.pkgd.min.js',
                '/js/isotope.pkgd.min.js',
                '/js/ScrollToPlugin.min.js',
                '/js/TweenMax.min.js',
                '/js/autotrack.min.js',
                '/img/icon.png',
                '/img/profile_pic.jpg',
                '/img/projects/KPBlog.png',
                '/img/projects/FaceWallet.png',
                '/img/projects/UkDatabase.png',
                '/img/projects/MachineLearning.jpg',
                '/img/projects/JavaOverview.png',
                '/img/projects/PythonOverview.png',
                '/img/projects/DeepLearning.jpg',
                '/img/projects/OOP.png',
                '/img/talks/plovdev.jpg'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});