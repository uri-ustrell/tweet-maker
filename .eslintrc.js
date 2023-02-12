module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'plugin:json/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['testing-library', 'prettier'],
  env: {
    browser: true,
    jest: true,
  },
  globals: {
    document: true,
    window: true,
    appUrl: true,
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.json'],
    },
    {
      files: ['*.spec.js', '*.spec.jsx'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  rules: {
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error'],
    'import/no-extraneous-dependencies': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['components', './src/components'],
          ['context', './src/context'],
          ['hooks', './src/hooks'],
          ['tools', './tools'],
          ['utils', './src/utils'],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
};
