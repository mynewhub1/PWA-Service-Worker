import { offlineFallback, warmStrategyCache } from 'workbox-recipes';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Set up page cache
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Set up asset cache
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

// Set up offline fallback
offlineFallback({
  pageFallback: '/offline.html',
});



// import { precacheAndRoute } from 'workbox-precaching';
// import {offlineFallback} from 'workbox-recipes';
// import {setDefaultHandler} from 'workbox-routing';
// import {NetworkOnly} from 'workbox-strategies';
// import {staticResourceCache} from 'workbox-recipes';
// import {imageCache} from 'workbox-recipes';

// setDefaultHandler(new NetworkOnly());

// precacheAndRoute(self.__WB_MANIFEST);
// staticResourceCache();
// imageCache();
// offlineFallback({
//     pageFallback: '/404.html'
// });

// Self.addEventListener('message', (event) => {
//     if(event.data && event.data.type === 'skip_waiting')
//     self.skipWaiting()
// });

// import {registerRoute} from 'workbox-routing';
// import {StaleWhileRevalidate} from 'workbox-strategies';
// import {warmStrategyCache} from 'workbox-recipes';
// import {CacheFirst} from 'workbox-strategies';


// registerRoute(
//   ({url}) => url.pathname.startsWith('/images/avatars/'),
//   new StaleWhileRevalidate()
// );

// // This can be any strategy, CacheFirst used as an example.
// const strategy = new CacheFirst();
// const urls = ['/offline.html'];

// warmStrategyCache({urls, strategy});


// import {registerRoute} from 'workbox-routing';
// import {StaleWhileRevalidate} from 'workbox-strategies';
// import {warmStrategyCache} from 'workbox-recipes';
// import {CacheFirst} from 'workbox-strategies';


// registerRoute(
//   ({url}) => url.pathname.startsWith('/images/avatars/'),
//   new StaleWhileRevalidate()
// );

// // This can be any strategy, CacheFirst used as an example.
// const strategy = new CacheFirst();
// const urls = ['/offline.html'];

// warmStrategyCache({urls, strategy});





// import {offlineFeedback} from 'workbox-recipes';
// import {setDefaultHandler} from 'workbox-routing';
// import {NetworkOnly} from 'workbox-strategies';
// import {staticResourceCache} from 'workbox-recipes';
// import {imageCache} from 'workbox-recipes';

// imageCache();
// staticResourceCache();

// setDefaultHandler(new NetworkOnly());
// offlineFallback();



