const path = require('path').resolve; //importujemy natywny moduł node js => path

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 entry: {
  index: path(__dirname, '..', 'src', 'index.js'),
 }, // plik wejściowy do naszego banglingu
 output: { // plik wyjściowy naszego banglingu
  filename: '[name].[contenthash:6].js', //na podstawie tego pliku hash będzie inny, przeglądarka nie będzie trzymać hash'u?, hash ograniczamy do 6 znaków 
  path: path(__dirname, '..', 'build'),
 },
 resolve: {
  extensions: ['.js', '.jsx'], //przy importach nie trzeba podawać takich końcówek
 },
 module: {
  rules: [
   {
    test: /\.(js|jsx)$/, // pliki w tym formacie będą brane pod uwagę przy testach
    exclude: /node_modules/, // te pliki wykluczamy z testów
    use: {
     loader: 'babel-loader', // co używamy do tłumaczenia
    }
   }
  ]
 },
 plugins: [
  new HtmlWebpackPlugin ({ //nowa instancja naszego pluginu
   template: path(__dirname, '..', 'public', 'index.html'),
  })
 ]
}