const path = require('path')
const dotenv = require('dotenv')

dotenv.config({
  silent: true,
  path: path.resolve(__dirname, '.env')
})

module.exports = {
  buildDir: path.resolve(__dirname, '.nuxt'),
  srcDir: path.resolve(__dirname, 'frontend'),
  cache: true,
  env: {
    HOST: process.env.HOST,
    PORT: process.env.PORT
  },

  head: {
    title: 'Watosan',
    titleTemplate: '%s - Watosan',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'og:type', property: 'og:type', content: 'article'},
      {hid: 'og:title', property: 'og:title', content: ''},
      {hid: 'og:site_name', property: 'og:site_name', content: 'Watosan'},
      {hid: 'og:url', property: 'og:url', content: 'http://watosan.org'},
      {hid: 'twitter:card', property: 'twitter:card', content: 'article'},
      {hid: 'twitter:site', property: 'twitter:site', content: '@watosanorg'},
      {hid: 'twitter:title', property: 'twitter:title', content: 'Watosan'},
      {hid: 'twitter:description', property: 'twitter:description', content: 'Another one developer\s blog'},
    ],
    link: [
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Inconsolata|Merriweather'}
    ]
  },

  css: [
    {src: 'highlight.js/styles/docco.css', lang: 'css'}
  ],

  loading: {
    color: '#3B8070'
  },

  manifest: {
    name: process.env.NAME,
    description: process.env.DESC,
    theme_color: '#3B8070'
  },

  modules: [
    // '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/markdownit',
    // '@nuxtjs/component-cache'
  ],

  // render: {
  //   static: {
  //     maxAge: '1y',
  //     setHeaders(response, path) {
  //       if (path.includes('sw.js')) {
  //         response.setHeader('Cache-Control', 'public, max-age=0')
  //       }
  //     }
  //   }
  // },

  // router: {
  //   middleware: [
  //     'https'
  //   ]
  // },

  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: {
        httpEndpoint: `http://${process.env.HOST}:${process.env.PORT}/graphql`
      }
    }
  },

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
    use: [
      'markdown-it-highlightjs',
      'markdown-it-emoji'
    ]
  },

  build: {
    extractCSS: true,
    vendor: [],
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
}
