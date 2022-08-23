const joi = require("@hapi/joi")

module.exports.createProject = joi.object().keys({
  title: joi.string().required(),
  objectivity: joi.array().required(),
  pdbId: joi.string(),
  uniprot: joi.object(),
})


module.exports.editProject = joi.object().keys({
  title: joi.string(),
  pdbId: joi.string(),
  objectivity: joi.array(),
  uniprot: joi.object(),
})


module.exports.projectRoundFile = joi.string().required()