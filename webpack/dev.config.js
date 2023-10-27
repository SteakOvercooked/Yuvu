const path = require('path');

const ROOT = path.resolve(__dirname, '../');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    filename: '[fullhash].js',
    path: path.resolve(ROOT, '/dist'),
    clean: true,
  },
  resolve: {
    modules: [path.resolve(ROOT, '/src'), 'node_modules'],
    extensions: ['.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
