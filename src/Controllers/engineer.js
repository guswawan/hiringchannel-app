const model = require ('../Models/engineer');
const form = require ('../Helpers/form');

module.exports = {
  getAllEngineer: (req, res) => {
    const {name_engineer, skill, limit, page, sorbBy, order} = req.query;
    const data = { name_engineer,skill,limit,page,sorbBy, order };
    model
      .getAllEngineer (data)
      .then (result=> {
        //resolve
        form.success (res, result);
      })
      .catch (err => {
        //reject
        console.log (err);
      });
  },
  getProfilEngineer: (req, res) => {

    model
      .getAllEngineer ()
      .then (result=> {
        //resolve
        form.success (res, result.filter(result => result.id_user == req.id_user.id_user));
      })
      .catch (err => {
        //reject
        console.log (err);
      });
  },
  postEngineer: (req, res) => {
    const {body} = req;
    model
      .postEngineer (body)
      .then (result => {
        //resolve
        const data = {
          id: result.insertId,
          name_engineer: body.name_engineer,
          description: body.description,
          location: body.location,
          birth: body.birth,
          link_showcase: body.link_showcase,
          date_created: new Date(),
          date_updated: new Date()
        };
        console.log("data", data)
        form.success (res, data);
      })
      .catch (err =>
        // reject
        console.log (err)
      );
  },
  patchEngineer: (req, res) => {
    const {params, query} = req;
 
    model
      .patchEngineer (query, params)
      .then (result => {
        //resolve
        res.json (result);
      })
      .catch (err =>
        //reject
        console.log (err)
      );
  },
  deleteEngineer: (req, res) => {
    const {id} = req.params;
 
    model
      .deleteEngineer (id)
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
