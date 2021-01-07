const { merge } = require('webpack-merge'); 
const commonConfiguration = require('./webpack/common');
module.exports = (_env, { mode }) => {
 const properlyConfig = require(`./webpack/${mode}`); //funkcja ta pobiera odpowiedni obiekt konfiguracyjny config - production || development
 const mergedConfig = merge(commonConfiguration, properlyConfig); //połączony config
 return mergedConfig;
}