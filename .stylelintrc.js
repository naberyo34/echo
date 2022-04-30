module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    'string-quotes': 'single',
  },
  overrides: [
    {
      files: ['**/*.{jsx,tsx}'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],
};
