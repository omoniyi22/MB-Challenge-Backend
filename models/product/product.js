const { Schema, model } = require('mongoose')
let one = {
  spec: {
    type: Schema.Types.ObjectId,
    ref: "specs"
  },
  key_feature: {
    type: Schema.Types.ObjectId,
    ref: "key_features"
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'admins'
  }
}

let two = {
  brand: {
    type: String,
    trim: true
  },
  title: {
    type: String,
  },
  rating: {
    type: Number,
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  }

}
const productModel = new Schema({
  ...one, ...two,
  picture: {
    type: Array,
    default : []
  },
  date: {
    type: Date,
    default: Date()
  }
},
  {
    timestamps: true
  }
)

module.exports = model("products", productModel)
module.exports.podct = Object.keys(two)