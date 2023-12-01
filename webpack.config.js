const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: path.resolve(__dirname, 'background.js'),
    popup: path.resolve(__dirname, 'popup.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'images'), to: path.resolve(__dirname, 'dist', 'images') },
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'content.js', to: 'content.js' },
        { from: 'popup.html', to: 'popup.html' },
        { from: 'popup.css', to: 'popup.css' },
      ],
    }),
  ],
};
