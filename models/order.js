const { model, Schema } = require('mongoose')
const OrderSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "products"
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profiles"
  },
  status: String,
  delivery_range: String
})

module.exports = model('orders', OrderSchema)