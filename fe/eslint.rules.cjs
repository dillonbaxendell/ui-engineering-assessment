module.exports = {
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // this repo uses named exports by default
    'import/prefer-default-export': 0,
    'no-underscore-dangle': [
      'error',
    ],
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true },
    ],
    'import/no-cycle': 0, // TEMP
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true },
    ],
    'import/extensions': ['error', 'always'],
    /*
      There's a lot of back and forth on this in https://github.com/airbnb/javascript/issues/1271
      I think it's safe to use for...of loops in our code but maybe not "in".
    */
    'no-restricted-syntax': [
      'error',
      'BinaryExpression[operator="in"]',
    ],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'never', prev: ['const', 'let'], next: ['const', 'let'] },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'max-len': 0,
    'func-names': ['error', 'as-needed'], // This is needed for watcher syntax of 'watched.property': (value) {}`
    // VUE specific rules
    // Fine tune from https://eslint.vuejs.org/rules/max-len.html#vue-max-len
    'vue/max-len': 0,
    'vue/no-v-html': ['warn'],
    'vue/script-indent': [
      'error',
      2, // This is to indicate it's 2 spaces
      { baseIndent: 1 }, // This indents the script block by 2.
    ],
    // Here's a list of things that AirBnb deems to be errors but we should still be able to load the app.
    semi: ['warn'],
    camelcase: [
      0,
      { ignoreDestructuring: true, properties: 'never' },
    ],
    'vue/camelcase': [
      0,
      { ignoreDestructuring: true, properties: 'never' },
    ],
    'vue/no-v-text-v-html-on-component': 0,
    // Accessibility
    'vuejs-accessibility/click-events-have-key-events': 0,
    'vuejs-accessibility/mouse-events-have-key-events': 0,
    'vuejs-accessibility/label-has-for': 0,
    'vuejs-accessibility/heading-has-content': 0,
    'jsdoc/require-returns-description': 0,
    'jsdoc/require-param-description': 0,
    // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-tag-names.md
    'jsdoc/check-tag-names': [1, { definedTags: ['category', 'vuedoc', 'subcategory'] }],
    // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/tag-lines.md
    'jsdoc/tag-lines': ['warn', 'any', { startLines: 1 }],
    // @vue/eslint-config-airbnb updates
    'import/no-unresolved': 'error',
    'vue/html-button-has-type': 0,
  },
};
