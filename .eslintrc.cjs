module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/vue3-essential', 'standard-with-typescript', './.eslintrc-auto-import.json'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    curly: ['error', 'all'],
    semi: ['warn', 'always'],
    '@typescript-eslint/semi': ['warn', 'always'],
    quotes: 'off',
    '@typescript-eslint/quotes': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['off', 'only-multiline'],
    'vue/multi-word-component-names': 'off',
  },
};
