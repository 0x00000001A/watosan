# Watosan
:metal: Fullstack blog VueJS + NuxtJS + MongoDB + Apollo + GraphQL + SSR + PWA + AMP

> :exclamation: Warning! This project is currently under development. Project may contain errors, incomplete parts and everything what incomplete project may have.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## :clipboard: Installation
```bash
# Install dependencies
npm i
# Configure the project
# It will create .env file for you and generate JWT Secret
node install
```

## :space_invader: Usage
```bash
# Serve in development mode
npm run dev
# Build for production
npm run build
# Serve in production mode
npm run start
# Lint
npm run lint
# Lint and fix
npm run lint:fix
```

## :gem: Features
- Send email (subscriptions)
- reCaptcha
- Posts
- Tags
- Backoffice
- Meta
- - Open Graph (incomplete!)
- - Twitter Card (incomplete!)

## :muscle: Tools, methodologies
- SSR ([NuxtJS](https://nuxtjs.org/))
- [VueJS](https://vuejs.org/)
- JWT
- - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- - [express-jwt](https://github.com/auth0/express-jwt)
- [MongoDB](https://www.mongodb.com/) ([Mongoose](https://mongoosejs.com/))
- GraphQL ([Apollo](https://www.apollographql.com/))
- - [vue-apollo Apollo Client](https://github.com/akryum/vue-apollo)
- - [NuxtJS apollo module](https://github.com/nuxt-community/apollo-module)
- - [Apollo server](https://www.apollographql.com/docs/apollo-server/)
- - [Apollo upload](https://github.com/jaydenseric/apollo-upload-server)
- [NuxtJS PWA](https://github.com/nuxt-community/pwa-module)
- [ENV (dotenv)](https://github.com/motdotla/dotenv)
- [AMP](https://www.ampproject.org/)
- [HighlightJS](https://highlightjs.org/)
- [PM2](http://pm2.keymetrics.io/)
- [Sass](https://sass-lang.com/)
- [Speakingurl (slug)](https://github.com/pid/speakingurl)
- [Nodemailer](https://nodemailer.com/about/) for mailing
- [reCaptcha](https://developers.google.com/recaptcha/)
- [Vue-multiselect](https://vue-multiselect.js.org/)
- [Backpack](https://github.com/jaredpalmer/backpack)
- Markdown
- - [NuxtJS Markdown-it module](https://www.npmjs.com/package/@nuxtjs/markdownit)
- - Plugins:
- - - markdown-it-highlightjs
- - - markdown-it-emoji
- [ESLint](https://eslint.org/) ([standard](https://github.com/standard/eslint-config-standard), [vue-recommended](https://github.com/vuejs/eslint-plugin-vue))
