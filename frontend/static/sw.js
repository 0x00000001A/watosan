importScripts('/_nuxt/workbox.42554690.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.04fcc514354966babce5e0e42b746a8f.css",
    "revision": "04fcc514354966babce5e0e42b746a8f"
  },
  {
    "url": "/_nuxt/app.65900d1ae5a1d60589e6.js",
    "revision": "ff9184c6dbe7a12075381cd83763f358"
  },
  {
    "url": "/_nuxt/layouts_default.ea821a7fb7ddb872cedd.js",
    "revision": "29562df7426d6d23a31af50bf3d5d6a2"
  },
  {
    "url": "/_nuxt/manifest.fb53bc915dade58eb784.js",
    "revision": "24b18fd4439cfd6e779d07565bc75edb"
  },
  {
    "url": "/_nuxt/pages_about.e3ff2fb617f06620f939.js",
    "revision": "1dd5bf270386aa829b4072a3fc18b617"
  },
  {
    "url": "/_nuxt/pages_feed.f8a687acb298f4da39d0.js",
    "revision": "304a787425e23d89ce4d3941de930b9a"
  },
  {
    "url": "/_nuxt/pages_index.9d8dd3ac232bdc8748cb.js",
    "revision": "b15e71f5912c62f6aaf61c1286d2c7d2"
  },
  {
    "url": "/_nuxt/pages_manage_index.75044de87b51d5b69a92.js",
    "revision": "691e7ef3c8ceacd79a95778272e0ae45"
  },
  {
    "url": "/_nuxt/pages_manage_posts_create.fca7a297cba631f32b2b.js",
    "revision": "4a4303be82a5942a8de208425a02c437"
  },
  {
    "url": "/_nuxt/pages_manage_posts_index.a03f8328817d1de2984c.js",
    "revision": "20ac0cd1c57208cc002029a06fbcba1f"
  },
  {
    "url": "/_nuxt/pages_manage_posts_update__id.4d6004efdb5536999e64.js",
    "revision": "286cc1abde07252bce3c7bf7034404d5"
  },
  {
    "url": "/_nuxt/pages_manage_signin.7998254a8b1d58bc39fb.js",
    "revision": "a125f0516466682df2b38431f95164fa"
  },
  {
    "url": "/_nuxt/pages_manage_subscribers.1ed1b3d061b278601489.js",
    "revision": "89a6bab2de20dbc15160a5a8f1bf0c99"
  },
  {
    "url": "/_nuxt/pages_manage.0dde76e0fe18e0f7bd95.js",
    "revision": "7d2d5bb04ff4ed062df55b0c663bb7a6"
  },
  {
    "url": "/_nuxt/pages_posts__slug.a794261b40978e70e86f.js",
    "revision": "218fc4e1899b9f4fa6fe0e41de05d1d8"
  },
  {
    "url": "/_nuxt/pages_posts_tag__tag.d7c0206cc5457158d61c.js",
    "revision": "3668ea938fd561580889eed3ca366d04"
  },
  {
    "url": "/_nuxt/pages_subscribe.d1cbe86d456936391aff.js",
    "revision": "d5504469b9648ebdd472b9e4670516ed"
  },
  {
    "url": "/_nuxt/pages_unsubscribe.4d800b1d29ab9186ce8a.js",
    "revision": "cb4a11e5b602b506744861a0353d1d4d"
  },
  {
    "url": "/_nuxt/vendor.8db3c2459ad023ad2cfa.js",
    "revision": "47bcd909a3e15c2e4f6583660315b915"
  }
], {
  "cacheId": "watosan.org",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')





