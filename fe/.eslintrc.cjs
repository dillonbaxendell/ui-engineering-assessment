const path = require('node:path');
const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting');
/* eslint-enable import/extensions */

module.exports = {
  root: true,
  env: { es2022: true },
  plugins: [
    'vue',
    'jsdoc',
  ],
  extends: [
    'plugin:vue/recommended',
    '@vue/eslint-config-airbnb',
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended',
    '@vue/airbnb',
    './eslint.rules.cjs',
  ],
  ignorePatterns: ['cypress/support/runCypress.js'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  settings: {
    ...createAliasSetting({
      '@': `${path.resolve(__dirname, './src')}`,
      '@T': `${path.resolve(__dirname, './tests')}`,
    }),
  },
  overrides: [
    {
      files: ['**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: { jest: true },
      globals: { vi: 'readonly' },
    },
    /*
      > This rule only checks .vue files and does not interfere with other .js files. Unfortunately the default indent rule when turned on will try to lint both, so in order to make them complementary you can use
      overrides setting and disable indent rule on .vue files:
      https://eslint.vuejs.org/rules/script-indent.html
    */
    {
      files: ['*.vue'],
      rules: { indent: 'off' },
    },
    {
      files: ['cypress/**/*'],
      env: {
        browser: true,
        es2022: true,
        node: true,
        jest: false,
      },
      extends: [
        'eslint:recommended',
        './eslint.rules.cjs',
      ],
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      rules: {
        'func-names': 0,
        indent: ['error', 2],
        'consistent-return': 0,
        'cypress/no-unnecessary-waiting': 0,
        'jest/valid-expect': 0,
        'jest/no-standalone-expect': 0,
        'jest/expect-expect': 0,
        'jest/valid-expect-in-promise': 0,
        'jest/valid-describe-callback': 0,
        'import/no-extraneous-dependencies': [
          'error', {
            devDependencies: false,
          },
        ],
        ImportDeclaration: 0,
      },
    },
  ],
};
