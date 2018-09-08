const path = require('path')

module.exports = {
  webpack: (config) => {
    config.entry.main = path.resolve(__dirname, 'backend', 'main.js')
    config.output.path = path.resolve(__dirname, '.backend')
    config.resolve.alias = {
      '~/': path.resolve(__dirname, 'backend')
    }

    return config
  }
}
