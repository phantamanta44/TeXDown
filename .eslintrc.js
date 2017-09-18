// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: 2,
    },
  },
  extends: 'google',
  rules: {
    'require-jsdoc': 0,
  },
}
