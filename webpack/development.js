//konfiguracja naszego webpacka, na użytek developmentu
module.exports = {
 devServer: { 
  contentBase: './public',
  port: 3000,
 },
 devtool: 'inline-source-map',//przy narzędziach developerskich będziemy mieli kod wstępnie skompilowany przez webpacka, to do debbagowania będziemy widzieć komponenty, podobnie do tego jak wyglądają w naszym kodzie źródłowym
 module: {
  rules: [
   {
    test: /\.module\.s(a|c)ss$/, //ładujemy nasze css'y - sass i scsss
    use: [ //zasada: to co wpisujemy piersze, jest używane przez webpack'a na końcu, co na końcu pierwsze jest wykorzystywane
     'style-loader', //można dodawać style liniowe, webpack wrzuci je do html
     {
      loader: 'css-loader',
      options: {
       modules: {
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
    exclude: /\.module.(s(a|c)ss)$/, //wykluczamy je
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
};