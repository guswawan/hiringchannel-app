const model = require ('../Models/company');
const form = require ('../Helpers/form');

module.exports = {
  getAllCompany: (_, res) => {
    model
      .getAllCompany ()
      .then (result => {
        //resolve
        form.success (res, result);
      })
      .catch (err => {
        //reject
        console.log (err);
      });
  },
  postCompany: (req, res) => {
    const {name_company, logo, location, description} = req.body;
    const data = {name_company, logo, location, description};
    console.log(data)
    model
      .postCompany (data)
      .then (result => {
        //resolve
        const data = {
          id: result.insertId,
          name_company: req.body.name_company,
          logo: req.body.logo,
          location: req.body.location,
          description: req.body.description
        };
        form.success (res, data);
      })
      .catch (err =>
        // reject
        console.log (err)
      );
  },
  patchCompany: (req, res) => {
    const {params, query} = req;
    // res.json ({
    //   params,
    //   query,
    // });
    model
      .patchCompany (query, params)
      .then (result => {
        //resolve
        res.json (result);
      })
      .catch (err =>
        //reject
        console.log (err)
      );
  },
  deleteCompany: (req, res) => {
    const {id} = req.params;
    // res.json ({
    //   params,
    //   query,
    // });
    model
      .deleteCompany (id)
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
