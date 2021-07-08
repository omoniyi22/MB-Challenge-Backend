const { model, Schema } = require('mongoose')
let profile = {
  full_name: String,
  email: String,
  password: String,
  phone: Number,
  
  income: Number,
  payment_duration: Number,
  rent_amount: Number,
  accommodation_status: String
}

const ProfileModel = new Schema({
  ...profile,
},
  { timestamps: true }
)
module.exports.profile = Object.keys(profile)
module.exports.Profile = model("Profile", ProfileModel)