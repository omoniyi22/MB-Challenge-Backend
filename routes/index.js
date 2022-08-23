const ProjectRoutes = require('./project')

const Routes = async router => {
  await ProjectRoutes(router)
}

module.exports = Routes