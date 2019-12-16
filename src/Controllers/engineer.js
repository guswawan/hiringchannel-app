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
  //===POST ENGINEER STUCK===
  postEngineer: (req, res) => {
    const {name_engineer, description, location, birth, date_created, date_updated} = req.body;
    const data = {name_engineer, description, location, birth, date_created, date_updated};
    console.log(data)
    model
      .postEngineer (data)
      .then (result => {
        //resolve
        const data = {
          id: result.insertId,
          name_engineer: name_company,
          description: description,
          location: location,
          birth: birth,
          date_created: new Date.now(),
          date_updated: new Date.now()
        };
        form.success (res, data);
      })
      .catch (err =>
        // reject
        console.log (err)
      );
  },
  //===END POST ENGINEER STUCK===
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
