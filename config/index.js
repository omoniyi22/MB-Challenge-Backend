require('dotenv').config()

module.exports = {
  APP_SECRET,
  SITE_URL,
  DB,
  NODE_ENV,
  PORT,
  EMAIL,
  PASSWORD,
  Client_ID,
  Client_secret
} = process.env

// module.exports = IN_PROD = NODE_ENV === "development"