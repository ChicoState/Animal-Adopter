// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}], // Preset to compile JavaScript for the current version of Node
    '@babel/preset-react' // Transform JSX into JavaScript
  ],
  plugins: [
    '@babel/plugin-transform-runtime' // Reduces code duplication in compiled output
  ]
};
