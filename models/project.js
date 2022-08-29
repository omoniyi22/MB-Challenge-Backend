const { model, Schema } = require('mongoose')

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  uniprot: {
    structure: String,
    id: String
  },

  pdbId: String,

  objectivity: [{
    property: String,
    goal: String,
  }],

  round: [{
    fileLink: String,
    fileId: String,
  }]
},

  {
    timestamps: true
  }
)

module.exports = model('projects', ProjectSchema)