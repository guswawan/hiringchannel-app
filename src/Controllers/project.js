const model = require ('../Models/project');
const form = require ('../Helpers/form');

module.exports = {

  getAllProject: (_, res) => {
    model.getAllProject ()
      .then (response=> {
        console.log("RES ",response)
        //resolve
        form.success (res, response);
      })
      .catch (err => {
        //reject
        console.log (err);
      });
  },
  postProject: (req, res) => {
    const {name_project,} = req.body;
    const data = {body}
    model
      .postProject (data)
      .then (result => {
        //resolve
        const data = {
          id_project: result.insertId,
          name_project: body.name_project,
        };
        console.log("data", data)
        form.success (res, data);
      })
      .catch (err =>
        // reject
        console.log (err)
      );
  },
  patchProject: (req, res) => {
    const {params, query} = req;
 
    model
      .patchProject (query, params)
      .then (result => {
        //resolve
        res.json (result);
      })
      .catch (err =>
        //reject
        console.log (err)
      );
  },
  deleteProject: (req, res) => {
    const {id} = req.params;
 
    model
      .deleteProject (id)
      .then (result => {
        //resolve
        res.json (result);
      })
      .catch (err =>
        //reject
        console.log (err)
      );
  },
};
