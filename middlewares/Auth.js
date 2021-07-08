const jwt = require("jsonwebtoken")
const { APP_SECRET } = require('./../config')

module.exports.Auth = {
  async verifyToken(req, res, next) {
    const toker = await req.header('benny-token')
    if (!toker) res.status(401).send({ msg: "Access Denied" })
    else
      try {
        jwt.verify(toker, APP_SECRET, async (err, res) => {
          req.user = await res
        })
        next()
      } catch (error) {
        res.status(400).json({ msg: "Invalid Token" })
      }
  },
  async generateToken(user) {
    console.log("user", { user })
    return jwt.sign({ user }, APP_SECRET, { expiresIn: "24h" })
  }
}