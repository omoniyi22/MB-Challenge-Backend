const ProfileRoutes = require('./profile')

const Routes = async router => {
  await ProfileRoutes(router)
}

module.exports = Routes