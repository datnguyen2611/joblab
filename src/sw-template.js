if (typeof importScripts === 'function') {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
    /*workbox.setConfig({
      debug: true,
    });*/

    workbox.core.skipWaiting();

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
    //workbox.precaching.createHandlerBoundToURL('/200.html');
    
    workbox.routing.registerRoute(
      new RegExp('^https://jobslab-media.s3.ap-east-1.amazonaws.com/.*'),
      new workbox.strategies.CacheFirst({
		cacheName: 'IMG',
        plugins: [
          new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200]
          })
		  ,
		  new workbox.expiration.ExpirationPlugin({
			  maxEntries: 50,
			  maxAgeSeconds: 5 * 24 * 60 * 60, // 5 Days
			}),
        ]
      }),
    );
    /* custom cache rules */
      //SPA fallback for navigation requests
     //workbox.routing.registerNavigationRoute('/index.html');
     /*workbox.routing.regsiterRoute(
       new workbox.routing.NavigationRoute(
         workbox.precaching.createHandlerBoundToURL('/200.html')
       ));*/

     workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        //new workbox.strategies.NetworkFirst({
        new workbox.strategies.CacheFirst({
          cacheName: 'PRODUCTION',
        })
      )
    );
  } 
}