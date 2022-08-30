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
  }],

  result: {
    total_sequences: Number,
    hits_value: Number,
    hits_percent: Number,
    best_sequence: Number,
    fold_improvement_over_wild_type: Number,
    muts_per_fitness: [],
  }
},

  {
    timestamps: true
  }
)

module.exports = model('projects', ProjectSchema)