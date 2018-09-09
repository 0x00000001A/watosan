module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {
    grecaptcha: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'indent': ['error', 2],
    'vue/script-indent': [
      'error',
      2,
      { 'baseIndent': 0 }
    ],
  },
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ]
}
