const { model, Schema } = require('mongoose')

const one = {
  product: {
    type: Schema.Types.ObjectId,
    ref: "products"
  },
  spec: {
    type: Schema.Types.ObjectId,
    ref: "specs"
  }
}

let two = {
  // General Features
  color: String,
  warranty: String,
  weight: String,

  //L and P basics
  OS: String,
  processor: String,
  GPU: String,
  RAM: String,
  ROM: String,
  audio: String,
  battery_life: String,
  display: String,
  model: String,
  battery_type: String,

  // Laptop Features
  wireless_technology: String,
  optical_drive: String,
  external_port: String,
  webcam: String,
  dimensions: String,
  fingerprint: String,
  faceunlock: String,

  // Phone Features
  screen_size: String,
  front_camera: String,
  back_camera: String,
  sim_type: String,
  sim_count: String,
  internet_connectivity: String,
  FM_radio: String,

  // Accessories
  // specification
  spec: Schema.Types.ObjectId,
  // Wares

}
const Key_Features_Model = new Schema(
  { ...one, ...two }
)

module.exports = model('key_features', Key_Features_Model)
module.exports.kf = Object.keys(two)