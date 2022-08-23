const ProjectController = require("./../controllers/Project");


const ProjectRoutes = async (router) => {
  // Main Project Routes
  await router.route("/projects").get(ProjectController.GetAllProjects);

  await router.route("/projects").post(ProjectController.CreateProject);

  await router.route("/projects/:id").patch(ProjectController.UpdateProject);

  await router.route("/projects/:id").delete(ProjectController.DeleteProject);



  // Round Files Routes
  await router.route("/projects/:projectId/:roundFile").post(ProjectController.AddProjectRound);

  await router.route("/projects/:projectId/:roundFile").delete(ProjectController.DeleteProject);

};

module.exports = ProjectRoutes;
