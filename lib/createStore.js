
if (process.env.NODE_ENV === 'development') {
  console.log("DEV" )
  module.exports = require('./createStore-dev');
} else {
  console.log("PROD")
  module.exports = require('./createStore-prod');
}
