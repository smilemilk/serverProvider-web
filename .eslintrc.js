module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.config.js'
      }
    }
  },
  rules: {
    'arrow-parens': 0,
    'camelcase': 0,
    'generator-star-spacing': 0,
    'prefer-promise-reject-errors': 'off',
    'one-var': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-multiple-empty-lines': [0, {max: 2}],
    'no-new': 'off',
    'no-unneeded-ternary': 0,
    'no-dupe-keys': 0,
    'no-unused-expressions': [0, 'always'],
    'no-useless-escape': 'off',
    'new-cap': [0, {newIsCap: true, capIsNew: false}],
    'space-before-function-paren': [0, 'always'],
    // 'quotes': 0, // 不启用这个规则
    semi: [0, 'always']
  }
}
