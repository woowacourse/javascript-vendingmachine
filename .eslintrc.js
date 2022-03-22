module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // project requirement
    'max-depth': ['error', 2],
    'max-lines-per-function': [
      'warn',
      { max: 20, skipBlankLines: false, skipComments: false },
    ],
    'no-alert': 'off',
    // custom rules
    'import/extensions': ['off'],
    'newline-before-return': 2,
    'no-console': 'warn',
  },
};
