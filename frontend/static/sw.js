importScripts('/_nuxt/workbox.42554690.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.04fcc514354966babce5e0e42b746a8f.css",
    "revision": "04fcc514354966babce5e0e42b746a8f"
  },
  {
    "url": "/_nuxt/app.543347d9fdc246c85ac9.js",
    "revision": "7dd86e5f1b07ed7d6b78cface8cbbbce"
  },
  {
    "url": "/_nuxt/layouts_default.c4d346bb6a22ff90bace.js",
    "revision": "e67a1827703d827c4d3eee08cb9441bf"
  },
  {
    "url": "/_nuxt/manifest.ec0a285538796b7c69b8.js",
    "revision": "02fcacbe67fd07f45aa357502c0ba536"
  },
  {
    "url": "/_nuxt/pages_index.c7d51ac93ad6f59051c1.js",
    "revision": "6cff3a842ce917291d315cb3ecf45017"
  },
  {
    "url": "/_nuxt/pages_manage_index.f4ef58b44b864853cc87.js",
    "revision": "83ceee6a84235f5284bb4eefd54f66f4"
  },
  {
    "url": "/_nuxt/pages_manage_posts_create.0fa8112240b7f5e537b6.js",
    "revision": "7f9fe28bd85cf7218bf8c6d9821fb463"
  },
  {
    "url": "/_nuxt/pages_manage_posts_index.dd773c207e67ed988be6.js",
    "revision": "4ae1d0d46113630228d03a32c91efc19"
  },
  {
    "url": "/_nuxt/pages_manage_posts_update__id.96aa6dbcfed3c8e09337.js",
    "revision": "ee064092a54953f10559c2df98e0514a"
  },
  {
    "url": "/_nuxt/pages_manage_signin.edec75da0f5019c8bd3a.js",
    "revision": "fed925e050eb54b549948b21e76375ab"
  },
  {
    "url": "/_nuxt/pages_manage.081368eff88f375217fa.js",
    "revision": "844db4811de460c01075b4d3c4f67729"
  },
  {
    "url": "/_nuxt/pages_posts__slug.40e0085de817d71309ec.js",
    "revision": "f64979f9b90d75ee218dda5fdf0da496"
  },
  {
    "url": "/_nuxt/pages_posts_tag__tag.9ea83e801b8370379b95.js",
    "revision": "0edf87636f4c5db4faabc3d8e7aa426a"
  },
  {
    "url": "/_nuxt/vendor.e269c1766cb7a07723ab.js",
    "revision": "b8c7d3ce946274d86d205aab41c11735"
  },
  {
    "url": "/_nuxt/workbox.42554690.js",
    "revision": "a89d01bc635a434df4c9696bb6fbcba7"
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





