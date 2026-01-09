const CACHE_NAME = 'smart-budget-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // إذا كان لديك ملفات CSS أو صور خارجية، أضف روابطها هنا
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&display=swap'
];

// تثبيت الـ Service Worker وحفظ الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// استرجاع الملفات (استخدام النسخة المحفوظة إذا لم يتوفر إنترنت)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// تحديث الـ Service Worker وحذف الكاش القديم عند التغيير
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
