const clear = require('clear')
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')

const args = {}
const questions = [
  {
    name: 'NODE_ENV',
    type: 'list',
    choices: [
      'development',
      'production'
    ],
    default: 'development',
    message: 'Default environment'
  },
  {
    name: 'NAME',
    type: 'input',
    default: 'Watosan',
    message: 'Blog name'
  },
  {
    name: 'DESC',
    type: 'input',
    default: 'Another one developer\'s blog',
    message: 'Blog description'
  },
  {
    name: 'AUTHOR_NAME',
    type: 'input',
    default: 'Watosan',
    message: 'Author full name'
  },
  {
    name: 'AUTHOR_EMAIL',
    type: 'input',
    default: 'mail@example.com',
    message: 'Author email'
  },
  {
    name: 'HOST',
    type: 'input',
    default: '127.0.0.1',
    message: 'Blog host'
  },
  {
    name: 'PROTOCOL',
    type: 'list',
    choices: [
      'http',
      'https'
    ],
    default: 'http',
    message: 'Blog host protocol'
  },
  {
    name: 'PORT',
    type: 'input',
    default: '3000',
    message: 'Blog port'
  },
  {
    name: 'MONGODB_HOST',
    type: 'input',
    default: '127.0.0.1',
    message: 'MongoDB host'
  },
  {
    name: 'MONGODB_PORT',
    type: 'input',
    default: '27017',
    message: 'MongoDB port'
  },
  {
    name: 'MONGODB_NAME',
    type: 'input',
    default: 'watosan',
    message: 'MongoDB database name'
  },
  {
    name: 'RECAPTCHA_KEY',
    type: 'input',
    message: 'Recaptcha key',
    validate: (input) => {
      return !!input.length
    }
  },
  {
    name: 'RECAPTCHA_SECRET',
    type: 'input',
    message: 'Recaptcha secret',
    validate: (input) => {
      return !!input.length
    }
  },
  {
    name: 'SMTP_HOST',
    type: 'input',
    message: 'SMTP Host (mail.mydomain.com)',
    default: 'mail.mydomain.com'
  },
  {
    name: 'SMTP_PORT',
    type: 'input',
    message: 'SMTP Port',
    default: '465'
  },
  {
    name: 'SMTP_SECURE',
    type: 'list',
    choices: [
      'true',
      'false'
    ],
    message: 'SMTP Use secure connection',
    default: 'true'
  },
  {
    name: 'SMTP_USER',
    type: 'input',
    message: 'SMTP username',
    default: 'username'
  },
  {
    name: 'SMTP_PASS',
    type: 'input',
    message: 'SMTP password',
    default: 'password'
  }
]

process.argv.forEach((str) => {
  const argumentData = str.split('=')
  const key = argumentData[0]
  const value = argumentData[1] || key
  args[key] = value || key
})

const wizard = {
  installation: () => {
    return inquirer.prompt(questions)
  }
}

function generateJWTSecret () {
  return new Promise((resolve, reject) => {
    require('crypto').randomBytes(48, (error, buffer) => {
      if (error) {
        reject(error)
      } else {
        resolve(buffer.toString('hex'))
      }
    })
  })
}

const run = async () => {
  clear()
  console.log(
    chalk.green(
      figlet.textSync('Watosan', { horizontalLayout: 'full' })
    )
  )
  console.log(chalk.green('🚀 Watosan blog installation wizard'))
  console.log(chalk.green('🚀 It will create .env file for you\n'))

  let env = {}

  if (args['-y']) {
    questions.forEach((question) => {
      env[question.name] = question.default || 'notset'
    })
  } else {
    env = await wizard.installation()
  }

  env.BASE_URL = `${env.PROTOCOL}://${env.HOST}`

  if (env.PORT) {
    env.BASE_URL += `:${env.PORT}`
  }

  env.GRAPHQL_URL = env.BASE_URL + '/graphql'
  env.JWT_SECRET = await generateJWTSecret()

  var fs = require('fs')
  var stream = fs.createWriteStream('.env')

  stream.once('open', () => {
    for (let envKey in env) {
      if (env.hasOwnProperty(envKey)) {
        stream.write(`${envKey}=${env[envKey]}\n`)
      }
    }
    stream.end()
  })
}

run()
