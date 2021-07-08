let { spech } = require('./specification')
let { kf } = require('./key_features')
let { podct } = require('./product')

module.exports = {
  Product: require('./product'),
  Key_Features: require('./key_features'),
  Spec: require('./specification'),
  spech,
  kf,
  podct
} 
