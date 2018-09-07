export default (context) => {
  let token = context.store.state.token
  let client = context.app.apolloProvider.defaultClient

  client.networkInterface.use([{
    applyMiddleware (request, next) {
      if (!request.options.headers) {
        request.options.headers = {}
      }

      request.options.headers['Authorization'] = `Bearer ${token}`

      next()
    }
  }])
}
