#!/usr/bin/env node
process.env.DEBUG = 'nuxt:*'

const apollo = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const {Nuxt, Builder} = require('nuxt');

const schema = require('./graphql/schema');
const nuxtConfig = require('../nuxt.config')

function initNuxt(app) {
  const nuxt = new Nuxt(nuxtConfig)

  new Builder(nuxt).build()

  // if (nuxtConfig.dev) {
  //   console.log('dev')
  //   new Builder(nuxt).build()
  // }

  nuxt.hook('build:before', (builder) => {
    console.log('build:before')
  })
  nuxt.hook('build:templates', (builder) => {
    console.log('build:templates')
  })
  nuxt.hook('build:extendRoutes', (builder) => {
    console.log('build:extendRoutes')
  })
  nuxt.hook('build:compile', (builder) => {
    console.log('build:compile')
  })
  nuxt.hook('build:compiled', (builder) => {
    console.log('build:compiled')
  })
  nuxt.hook('build:done', (builder) => {
    console.log('build:done')
  })

  app.use(nuxt.render)
}

function initExpress() {
  const app = express();

  app.use('/photos', express.static('photos'))

  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  return app;
}

function initApollo(app) {
  return new apollo.ApolloServer({
    schema,
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
  });
}

async function connectDatabase() {
  await mongoose.connect(
    `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`,
    { useNewUrlParser: true}
  );
}

async function runServer() {
  const app = initExpress();
  initApollo(app);
  initNuxt(app);

  try {
    await connectDatabase();
    console.log('🚀 Attempting to connect to the database');
  } catch (error) {
    console.log(error);
  }

  app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(
      `🚀 Server ready at http://${process.env.HOST}:${process.env.PORT}`
    );
  });
}

runServer().finally(() => {
  console.log('🚀 Successfull')
});
