require('dotenv').config()

module.exports = {
  DB,
  NODE_ENV,
  PORT,
  CLOUDNARY_CLOUD_NAME,
  CLOUDNARY_API_KEY,
  CLOUDNARY_API_SECRET,
} = process.env

// module.exports = IN_PROD = NODE_ENV === "development"