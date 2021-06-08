require('@babel/polyfill');

const api = require('./app.js').default;
console.log(api);

module.exports = {
  api,
};
