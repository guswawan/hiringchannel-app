const model = require ('../Models/engineer');
const form = require ('../Helpers/form');

module.exports = {
  getAllEngineer: (_, res) => {
    model
      .getAllEngineer ()
      .then (result => {
        //resolve
        form.success (res, result);
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
          date_created: Date.now(),
          date_updated: Date.now()
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
    // res.json ({
    //   params,
    //   query,
    // });
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
    // res.json ({
    //   params,
    //   query,
    // });
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
  }
};
