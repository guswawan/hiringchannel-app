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
    const {body} = req;
    // const data = {name_project}
    model
      .postProject (body)
      .then (result => {
        //resolve
        const data = {
          id_project: result.insertId,
          name_project: body.name_project,
          id_company: body.id_company,
          id_engineer: body.id_engineer,
          name_project: body.name_project,
          status_project: body.status_project,
          status_engineer: body.status_engineer
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
