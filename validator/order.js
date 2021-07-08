const joi = require("@hapi/joi")

module.exports.registerValidator = joi.object().keys({
  first_name: joi.string().min(6).required(),
  last_name: joi.string().min(6).required(),
  email: joi.string().required().email(),
  password: joi.string().min(6).required()
})


module.exports.loginValidator = joi.object().keys({
  email: joi.string().required().email(),
  password: joi.string().min(6).required()
})