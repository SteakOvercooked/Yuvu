const path = require('path');
const { merge } = require('webpack-merge');

const devConfig = require('./dev.config');
const prodConfig = require('./prod.config');

const ROOT = path.resolve(__dirname, '../');

const config = {
  entry: path.resolve(ROOT, 'src/index.tsx'),
  output: {
    filename: 'index.js',
    path: path.resolve(ROOT, 'dist'),
    library: 'yuvu',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    clean: true,
  },
  resolve: {
    modules: [path.resolve(ROOT, 'src'), path.resolve(ROOT, 'node_modules')],
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      react: path.resolve(ROOT, 'node_modules/react'),
      'react-dom': path.resolve(ROOT, 'node_modules/react-dom'),
    },
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
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
  },
};

module.exports = (env) => {
  switch (env.NODE_ENV) {
    case 'dev':
      return merge(config, devConfig);
    case 'prod':
      return merge(config, prodConfig);
    default:
      throw new Error(
        `No config exists for specified NODE_ENV=${env.NODE_ENV}`
      );
  }
};
