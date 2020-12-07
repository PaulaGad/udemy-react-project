// plik produkcyjny 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizaCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
 optimization: {
  minimizer: [
   new OptimizaCssAssetsWebpackPlugin({}),
  ],
 },
 module: {
  rules: [
   {
    test: /\.module\.s(a|c)ss$/,
    use: [
     MiniCssExtractPlugin.loader,
     {
      loader: 'css-loader',
      options: {
       module: {
        localIdentName: '[local]',
       }
      },
     },
     {
      loader: 'sass-loader',
      options: {
       sourceMap: true,
      }
     }
    ]
   },
   {
    test: /\.(s(a|c)ss|css)$/,
    exclude: /\.module.(s(a|c)ss)$/,
    loader: [
     'style-loader',
     'css-loader',
     {
      loader: 'sass-loader',
      options: {
       sourceMap: true,
      }
     }
    ]
   },
  ]
 },
 plugins: [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
   filename: 'style.[contenthash:6].css',
   chunkFilename: 'style.[contenthash:6].css',
   publicPath: './'
  }),
 ],
}