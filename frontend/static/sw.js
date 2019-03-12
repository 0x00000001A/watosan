importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0254c759028ac540ad68.js",
    "revision": "2bcf0b06ff484e276748717d66ff796a"
  },
  {
    "url": "/_nuxt/13f87b340caafbf7e1ce.css",
    "revision": "156fdf67f00dccaee0b126c9422d07a3"
  },
  {
    "url": "/_nuxt/1f68391718a82a158c52.js",
    "revision": "4306abb9ba3c303728ca6770584464ca"
  },
  {
    "url": "/_nuxt/2ac5cb7e793a7507cf59.js",
    "revision": "16bc84316d04e0a8e7bda2fea4eef8ba"
  },
  {
    "url": "/_nuxt/2da9df12a83df2d5f0f7.js",
    "revision": "d9cd9913c74016c087879e20577d0334"
  },
  {
    "url": "/_nuxt/31afa809a8c2ec06b396.js",
    "revision": "d556fa200c89d0d8e81637bc6408bc15"
  },
  {
    "url": "/_nuxt/3e333051750521c696a3.js",
    "revision": "803995678441c2a8415f513afad489eb"
  },
  {
    "url": "/_nuxt/4634c174f937cf99af4c.css",
    "revision": "f215d5cfbe89f177fc64225db143270b"
  },
  {
    "url": "/_nuxt/4fb736e451bbff672bda.js",
    "revision": "137c32195b9f3d8c6aa20732438a1d78"
  },
  {
    "url": "/_nuxt/59eb01c5d900c00fb65b.css",
    "revision": "c6f413375e97f45311a1a275670131c8"
  },
  {
    "url": "/_nuxt/71480b83474662c3b8cd.js",
    "revision": "9daf00cec39c4560466ed27f61369ea3"
  },
  {
    "url": "/_nuxt/735c069a32d69eeb5a3e.js",
    "revision": "eb313d118a662e61bbcc321838aae677"
  },
  {
    "url": "/_nuxt/739ae5caac11d977a83d.js",
    "revision": "4fc42238c69d1093a2c1d0b98c7c71fd"
  },
  {
    "url": "/_nuxt/755b63603e84369dd497.js",
    "revision": "ba9e89fbd6e2552c2ca9802ffd2ecd69"
  },
  {
    "url": "/_nuxt/8cc1a51f79adb3fac3d0.js",
    "revision": "dee5f17a95ee90d6b1c82f150b1f0b67"
  },
  {
    "url": "/_nuxt/8f77f7e0fcdb8b380b42.css",
    "revision": "4df04116f1e28f92e79cb057fd41d5ff"
  },
  {
    "url": "/_nuxt/99c12b6cacab6023d77d.js",
    "revision": "9bd44eefdc606367b404a57fd9fa551d"
  },
  {
    "url": "/_nuxt/ada9c1479f0834a0d643.js",
    "revision": "6afd82903bd077388bd536f10334899d"
  },
  {
    "url": "/_nuxt/adb0865d1714610961c7.js",
    "revision": "d7d24c3f1b9f81f713c48f600806f5a3"
  },
  {
    "url": "/_nuxt/b4e6d3b91a8166af3f17.css",
    "revision": "20b39dec82913bdcb4d7d7726da679bc"
  },
  {
    "url": "/_nuxt/bef719631dad0fc3b0ac.js",
    "revision": "661cbb8fc9206adf4e682c8092244b35"
  },
  {
    "url": "/_nuxt/d584b622919d80a79b7a.js",
    "revision": "30da74eae4f41302b509f7d6d2073a2a"
  },
  {
    "url": "/_nuxt/dcfb1e7c27146b6790ef.js",
    "revision": "90a8dcb4957fd208c93a46a519c9134d"
  },
  {
    "url": "/_nuxt/f1baff66fe93fe48fdfc.js",
    "revision": "8cda88125d8de7f5a7289e45e2f6e179"
  },
  {
    "url": "/_nuxt/f64060d62a23154e09c6.js",
    "revision": "7692f831fcf952506ba652fc81d6ccab"
  },
  {
    "url": "/_nuxt/f953c0b6f83e838b071d.css",
    "revision": "2fa122eac7fbb11f435e0e41f86d09ce"
  },
  {
    "url": "/_nuxt/faa5053b5e248c3b0cf1.css",
    "revision": "cbaf86add7b2c668c614e67e0fbd3ab4"
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
