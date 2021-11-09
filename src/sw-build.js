const workboxBuild = require('workbox-build');
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  workboxBuild
    .injectManifest({
      swSrc: 'src/sw-template.js', // this is your sw template file
      swDest: 'build/service-worker.js', // this will be created in the build step
      // Prevent index flash
      //navigateFallback: "/200.html",
      // Define runtime caching rules.
     /* runtimeCaching: [{
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        
        // Apply a cache-first strategy.
        handler: 'CacheFirst',
        options: {
            // Use a custom cache name.
            cacheName: 'images',
            
            // Only cache 50 images.
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 5 * 24 * 60 * 60, // 5 Days
            },
        },
      }],*/
      globDirectory: 'build',
      globPatterns: ['**/*.{jpg,png,css,html}'], // precaching files
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    })
    .catch(console.error);
};

buildSW();

