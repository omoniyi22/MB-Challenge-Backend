const ProjectController = require("./../controllers/Project");
const Multer = require("./../middleware/multer")

const ProjectRoutes = async (router) => {
  // Main Project Routes
  await router.route("/projects").get(ProjectController.GetAllProjects);

  await router.route("/projects/:id").get(ProjectController.GetOneProjects);

  await router.route("/projects").post(ProjectController.CreateProject);

  await router.route("/projects/:id").patch(ProjectController.UpdateProject);

  await router.route("/projects/:id").delete(ProjectController.DeleteProject);



  // Round Files Routes
  await router.route("/projects/:projectId/round").post(ProjectController.AddProjectRound);

  // await router.route("/projects/:projectId/:roundId").delete(ProjectController.DeleteProject);

};

module.exports = ProjectRoutes;
