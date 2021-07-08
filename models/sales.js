const { model, Schema } = require('mongoose')

const salesModel = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products"
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profiles"
  },
  amount: Number
})

module.exports = model("sales", salesModel)