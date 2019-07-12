module.exports = {
  extends: ['plugin:prettier/recommended'],
  env: {
    es6: true,
    node: false,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
}
