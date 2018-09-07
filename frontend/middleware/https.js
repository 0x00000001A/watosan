/**
 * Redirect to https (production only)
 * @param isDev
 * @param req
 * @param redirect
 * @returns {*}
 */
export default ({ isDev, req, redirect }) => {
  if (!isDev && req) {
    const encrypted = req.headers['x-forwarded-proto'] === 'https' || req.connection.encrypted

    if (!encrypted) {
      return redirect(301, `https://${req.headers.host}${req.url}`)
    }
  }
}
