import jwt from 'express-jwt'
import express from 'express'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import { Nuxt, Builder } from 'nuxt'

import feed from './feed'
import schema from './graphql/schema'
import nuxtConfig from '../nuxt.config'

process.env.DEBUG = 'nuxt:*'

function initNuxt (app) {
  const nuxt = new Nuxt(nuxtConfig)

  new Builder(nuxt).build()

  if (nuxtConfig.dev) {
    new Builder(nuxt).build()
  }

  app.use(nuxt.render)
}

function initExpress () {
  const app = express()

  app.use(jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
  }))

  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      })
    }
  })

  app.use('/feed', feed)
  app.use('/photos', express.static('photos'))

  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

  return app
}

function initApollo (app) {
  return new ApolloServer({
    schema,
    context: ({ req }) => ({
      user: req.user,
      remoteip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    }),
    debug: process.env.NODE_ENV === 'development',
    playground: {
      settings: {
        'editor.cursorShape': 'line',
        'editor.theme': 'light'
      }
    }
  }).applyMiddleware({
    app,
    bodyParser: true
  })
}

async function connectDatabase () {
  await mongoose.connect(
    `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`,
    { useNewUrlParser: true }
  )
  mongoose.set('useCreateIndex', true)
}

async function runServer () {
  const app = initExpress()
  initApollo(app)
  initNuxt(app)

  try {
    await connectDatabase()
    console.log('🚀 Trying to connect to the database')
  } catch (error) {
    console.log(error)
  }

  app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(
      `🚀 Server ready at http://${process.env.HOST}:${process.env.PORT}`
    )
  })
}

runServer().finally(() => {
  console.log('🚀 Successful')
})
