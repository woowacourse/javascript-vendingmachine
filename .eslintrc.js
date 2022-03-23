module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-var': 'error',
    'max-depth': ['error', 2],
    'max-lines-per-function': ['error', 20],
    'no-console': 'warn',
    'import/extensions': 'off',
    'no-alert': 'off',
    'comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    // 'no-param-reassign': [
    //   'error',
    //   {
    //     props: false,
    //   },
    // ],
    // 'operator-linebreak': 'off',
    // 'object-curly-newline': 'off',
    // 'implicit-arrow-linebreak': 'off',
    // 'function-paren-newline': 'off',
  },
};
