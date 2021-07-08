const joi = require("@hapi/joi");
module.exports.registerValidator = joi.object().keys({
  full_name: joi.string().min(1).required(),
  email: joi.string().required().email(),
  password: joi.string().min(6).required(),
  phone: joi.number().min(11).required(),
});

module.exports.loginValidator = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().min(6).required(),
});

module.exports.profileValidator = joi.object().keys({
  income: joi.number().min(1),
  rent_amount: joi.number().min(1),
  payment_duration: joi.number().min(1),
  accommodation_status: joi.string().min(1),
});
