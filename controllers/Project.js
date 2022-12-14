const Project = require("./../models/project");
const { createProject, editProject } = require("./../validator/project");
const { createReadStream } = require('fs');
const parse = require('csv-parse').parse;
const { FileValidation, Cloudinary, GenerateResult } = require("./../utils/index")
const rimraf = require('rimraf');


const ProjectController = {
  async GetAllProjects(req, res) {
    try {
      const allProjects = await Project.find();
      await res.status(200).json({
        msg: "Fetched successfully",
        data: allProjects,
      });
    } catch (error) {
      res.status(500).json({
        msg: "An error occured",
        error
      });
    }
  },

  async GetOneProjects(req, res) {
    try {
      const project = await Project.findById(req.params.id);
      await res.status(200).json({
        msg: "Fetched successfully",
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        msg: "An error occured",
        error
      });
    }
  },

  async CreateProject(req, res) {
    try {
      const { error } = createProject.validate(req.body);
      if (error) res.status(400).json({ msg: error.details[0].message });

      else {
        let newProject = new Project(req.body);
        let savedProject = await newProject.save();

        res.status(201).json({
          msg: `Project created successfully`,
          data: savedProject,
        });
      }
    } catch (error) {
      res.status(500).send({
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

        if (!project) {
          res.status(404).json({ msg: "Project not found" });

        } else {
          let { title, uniprot, pdbId, objectivity } = await req.body;

          project.title = await title !== null ? title : project.title;
          project.uniprot = await uniprot !== null ? uniprot : project.uniprot;
          project.pdbId = await pdbId !== null ? pdbId : project.pdbId;
          project.objectivity = await objectivity !== null ? objectivity : project.objectivity;

          await project.save();

          const fetchAllProjectsUptoDate = await Project.find();

          res.status(200).json({
            msg: "Project updated successfully",
            data: fetchAllProjectsUptoDate
          });

        }
      } catch (error) {
        res.status(500).send({
          msg: "An error occured",
          err: error
        });
      }
  },

  async DeleteProject(req, res) {
    try {
      let projectExist = await Project.findById(req.params.id)
      if (!projectExist) {
        res.status(404).send({
          msg: "Project not found",
        });
      } else {
        await Project.findByIdAndDelete(req.params.id)

        const fetchAllProjectsUptoDate = await Project.find();

        res.status(200).send({
          msg: "Project successfully deleted",
          data: fetchAllProjectsUptoDate
        });
      }
    } catch (error) {
      res.status(500).send({
        msg: "An error occured",
        err: error,
      });
    }
  },



  async AddProjectRound(req, res) {
    try {
      if (req.files === null) {
        res.status(400).json({ msg: "No file uploaded" })
      }


      let project = await Project.findById(req.params.projectId)
      if (!project) {
        res.status(404).json({ msg: "Project not found" })
      } else {
        let projectSequence = await project.uniprot.structure

        let sampleFile = req.files.file;

        let uploadPath = __dirname + "/../utils/" + sampleFile.name;

        if (sampleFile.mimetype !== "text/csv") res.status(404).json({ msg: "File Type is not supported" })
        else sampleFile.mv(uploadPath, async function (err) {
          if (err) {
            console.log({ err })
            res.status(500).json(err)
          }
          else {
            var parser = parse({ columns: false }, async function (err, records) {
              if (err) {
                console.log({ err })
                res.status(500).json(err)
              }
              else {
                // Vet the CSV File              
                let ErrorInFle = FileValidation(records, projectSequence)
                let Result = GenerateResult(records, projectSequence)
                project.result = Result
                if (ErrorInFle) res.status(500).json({ msg: ErrorInFle, })
                else {
                  try {
                    const options = {
                      folder: "rounds",
                      resource_type: "auto"
                    };

                    const feadback = await Cloudinary.uploader.upload(uploadPath, options)

                    project.round = [{
                      fileLink: feadback.secure_url,
                      fileId: feadback.public_id
                    }];

                    const savedProject = await project.save();

                    res.status(200).send({
                      msg: "File Uploaded Successfully",
                      data: savedProject,
                    });

                    rimraf(`./utils/${sampleFile.name}`, () => console.log("done"));

                  } catch (error) {
                    res.status(500).send({
                      msg: "Error during upload",
                      data: error,
                    });

                  }
                }
              }
            });
            createReadStream(uploadPath).pipe(parser)
          }
        })
      }

    } catch (error) {
      res.status(500).send({
        msg: "An error occured",
        err: error,
      });
    }
  }
};


module.exports = ProjectController;