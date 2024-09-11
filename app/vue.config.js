import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

export default {
  configureWebpack: {
    entry: {
      app: './src/main.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: true,
        chunks: ['app'],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/assets',  // Relative path
            to: 'assets',        // Destination path
          },
        ],
      }),
    ],
  },
};
