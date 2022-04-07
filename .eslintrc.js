module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  extends: [
    'airbnb-base',
    'plugin:cypress/recommended',
    // jest 편집 시에 사용, Cypress와 호응하지 않기 때문에 동시 사용 불가
    // 'plugin:jest/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'cypress'],
  rules: {
    'no-var': 'error',
    'max-depth': ['error', 2],
    'no-console': 'warn',
    'import/extensions': 'off',
    'no-alert': 'off',
    'comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'linebreak-style': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'operator-linebreak': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-use-before-define': 'off',
    'no-new': 'off',
  },
};
