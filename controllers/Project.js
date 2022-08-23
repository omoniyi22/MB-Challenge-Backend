const Project = require("./../models/project");
const { createProject, editProject, projectRoundFile } = require("./../validator/project");

const ProjectController = {
  async GetAllProjects(req, res) {
    try {
      const allProjects = await Project.find();
      await res.status(200).json({
        msg: "Fetched successfully",
        data: allProjects,
      });
    } catch (error) {
      res.status(400).json({
        msg: error,
      });
    }
  },

  async CreateProject(req, res) {
    try {
      const { error } = createProject.validate(req.body);
      if (error) res.status(400).json({ msg: error.details[0].message });

      else {
        let savedProject = await newProject.save();

        res.status(201).json({
          msg: `Project created successfully`,
          data: savedProject,
        });
      }
    } catch (error) {
      console.log({ error });
      res.status(401).send({
        msg: "An error occured",
        err: error,
      });
    }
  },


  async UpdateProject(req, res) {
    let { error } = editProject.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else
      try {

        let project = await Project.findById(req.params.id);
        let { title, uniprot, pdbId, objectivity } = await req.body;

        project.title = await title !== null ? title : project.title;
        project.uniprot = await uniprot !== null ? uniprot : project.uniprot;
        project.pdbId = await pdbId !== null ? pdbId : project.pdbId;
        project.objectivity = await objectivity !== null ? objectivity : project.objectivity;

        let savedProject = await project.save();
        res.status(200).json({
          msg: "Project updated successfully",
          data: savedProject
        });

      } catch (error) {
        console.log(error);
        res.status(400).send({
          msg: "An error occured",
          err: error,
        });
      }
  },

  async DeleteProject(req, res) {
    try {
      Project.findByIdAndDelete(req.params.id)
      res.status(200).send({
        msg: "Project successfully deleted",
      });
    } catch (error) {
      res.status(400).send({
        msg: "An error occured",
        err: error,
      });
    }
  },

  async AddProjectRound(req, res) {
    try {
      let { projectId, roundFile } = await req.params;

      let project = await Project.findById(projectId);

      const { error } = projectRoundFile.validate(req.body.roundFile);
      if (error) res.status(400).json({ msg: error.details[0].message });

      if (project.round) {
        project.round = [...project.round, roundFile];
      } else {
        project.round = [roundFile];
      }

      let savedProject = await project.save();

      res.status(200).send({
        msg: "Round successfully added",
        data: savedProject
      });

    } catch (error) {
      res.status(400).send({
        msg: "An error occured",
        err: error,
      });
    }
  },

  async DeleteProjectRound(req, res) {
    try {

      let { projectId, roundFile } = await req.params;

      let project = await Project.findById(projectId);

      const { error } = projectRoundFile.validate(roundFile);
      if (error) res.status(400).json({ msg: error.details[0].message });


      if (project.round) {
        let updatedProjectRounds = project.round.filter((round) => round !== roundFile)
        project.round = await updatedProjectRounds;

        let savedProject = await project.save();

        res.status(200).send({
          msg: "Round successfully deleted",
          data: savedProject
        });

      } else {
        res.status(404).send({
          msg: "Not Found",
        });
      }
    } catch (error) {
      res.status(400).send({
        msg: "An error occured",
        err: error,
      });
    }
  }
};


module.exports = ProjectController;
