// TODO: expand configuration and autoformat on save
module.exports = {
  parser: 'babel-eslint',
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/app/']
      }
    }
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:jest/recommended',
    'jest-enzyme'
  ],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
    'react/jsx-no-duplicate-props': [
      'error',
      {
        ignoreCase: false
      }
    ],
    'react/jsx-max-depth': [
      'error',
      {
        max: 4
      }
    ],
    'react/boolean-prop-naming': [
      'error',
      {
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+'
      }
    ],
    'react/prop-types': 0,
    'react/jsx-no-bind': 0,
    'no-underscore-dangle': 0,
    'import/imports-first': ['warning', 'absolute-first'],
    'import/newline-after-import': 'warning',
    'react/prefer-stateless-function': 'off',
    'react/destructuring-assignment': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-unused-expressions': 0,
    'arrow-body-style': 0,
    'react/no-did-update-set-state': 0,
    'class-methods-use-this': 0,
    'prefer-destructuring': 0,
    'no-useless-constructor': 1,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'default-case': 0,
    'import/prefer-default-export': 0
  }
};
