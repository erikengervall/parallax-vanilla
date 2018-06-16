module.exports = {
  extends: ['prettier'],
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
}
