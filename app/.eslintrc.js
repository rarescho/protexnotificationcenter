module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ["prettier"],
  parser: "babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"]
    }
  },
  rules: {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": ["off"],
    "react/prefer-stateless-function": ["off"],
    "import/extensions": ["off"],
    "import/no-unresolved": ["off"],
    "indent": ["error", 2]
  }
}