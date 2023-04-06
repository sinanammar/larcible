module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:node/recommended'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
  },
}
