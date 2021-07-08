const { model, Schema } = require('mongoose')

let one = {
  SKU: String,
  Model: String,
  Operating_System: String,
  Color: String,
  Product_Line: String,
  Size: String,
  Production_Country: String,
  More: Object
}

const Spec_Model = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products"
  },
  key_feature: {
    type: Schema.Types.ObjectId,
    ref: "key_features"
  },
  ...one
})



module.exports = model("specs", Spec_Model)
module.exports.spech = Object.keys(one)