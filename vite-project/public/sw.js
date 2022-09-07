import { precacheAndRoute } from 'workbox-precaching';
import {offlineFallback} from 'workbox-recipes';
import {setDefaultHandler} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';
import {staticResourceCache} from 'workbox-recipes';
import {imageCache} from 'workbox-recipes';

setDefaultHandler(new NetworkOnly());

precacheAndRoute(self.__WB_MANIFEST);
staticResourceCache();
imageCache();
offlineFallback({
    pageFallback: '/404.html'
});

Self.addEventListener('message', (event) => {
    if(event.data && event.data.type === 'skip_waiting')
    self.skipWaiting()
});