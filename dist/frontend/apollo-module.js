import Vue from 'vue'
import VueApollo from 'vue-apollo'
import 'isomorphic-fetch'
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'
import jsCookie from 'js-cookie'
import cookie from 'cookie'
import { InMemoryCache } from 'apollo-cache-inmemory'

Vue.use(VueApollo)

export default (ctx, inject) => {
  const providerOptions = { clients: {} }
  const { app, beforeNuxtRender, req } = ctx
  const AUTH_TOKEN_NAME = 'apollo-token'
  const AUTH_TYPE = 'Bearer '

  // Config
  
      const defaultTokenName = ''  || AUTH_TOKEN_NAME

      function defaultGetAuth () {
        let token
        if(process.server){
          const cookies = cookie.parse((req && req.headers.cookie) || '')
          token = cookies[defaultTokenName]
        } else {
          token = jsCookie.get(defaultTokenName)
        }
        return token ? AUTH_TYPE + token : ''
      }

      let defaultClientConfig;
      
        defaultClientConfig = {
  "httpEndpoint": "http://127.0.0.1:3000/graphql"
}
      

      const defaultCache = defaultClientConfig.cache
        ? defaultClientConfig.cache
        : new InMemoryCache()

      if (!process.server) {
        defaultCache.restore(window.__NUXT__ ? window.__NUXT__.apollo.defaultClient : null)
      }

      if (!defaultClientConfig.getAuth) {
        defaultClientConfig.getAuth = defaultGetAuth
      }
      defaultClientConfig.ssr = !!process.server
      defaultClientConfig.cache = defaultCache
      defaultClientConfig.tokenName = defaultTokenName

      // Create apollo client
      let defaultApolloCreation = createApolloClient({
        ...defaultClientConfig
      })
      defaultApolloCreation.apolloClient.wsClient = defaultApolloCreation.wsClient

      
          providerOptions.defaultClient = defaultApolloCreation.apolloClient
      
  

  const vueApolloOptions = Object.assign(providerOptions, {
      errorHandler (error) {
         console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
      }
  })

  const apolloProvider = new VueApollo(vueApolloOptions)
  // Allow access to the provider in the context
  app.apolloProvider = apolloProvider
  // Install the provider into the app
  app.provide = apolloProvider.provide()

  if (process.server) {
    beforeNuxtRender(async ({ Components, nuxtState }) => {
      Components.forEach((Component) => {
        // Fix https://github.com/nuxt-community/apollo-module/issues/19
        if (Component.options && Component.options.apollo && Component.options.apollo.$init) {
          delete Component.options.apollo.$init
        }
      })
      await apolloProvider.prefetchAll(ctx, Components)
      nuxtState.apollo = apolloProvider.getStates()
    })
  }

  inject('apolloHelpers', {
    onLogin: async (token, apolloClient = apolloProvider.defaultClient) => {
      if (token) {
        jsCookie.set(AUTH_TOKEN_NAME, token)
      } else {
        jsCookie.remove(AUTH_TOKEN_NAME)
      }
      if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
      try {
        await apolloClient.resetStore()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('%cError on cache reset (setToken)', 'color: orange;', e.message)
      }
    },
    onLogout: async (apolloClient = apolloProvider.defaultClient) => {
        jsCookie.remove(AUTH_TOKEN_NAME)
        if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
        try {
            await apolloClient.resetStore()
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
        }
    },
    getToken: (tokenName = AUTH_TOKEN_NAME) => {
        if(process.server){
            const cookies = cookie.parse((req && req.headers.cookie) || '')
            return cookies && cookies[tokenName]
        }
        return jsCookie.get(tokenName)
    }
  })
}
