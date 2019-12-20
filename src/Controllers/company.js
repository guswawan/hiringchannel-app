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
  //kunune byid
  getCompany: (_, res) => {
    model
      .getCompany ()
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
    const {body} = req;
    model
      .postCompany (body)
      .then (result => {
        // resolve
        const data = {
          id: result.insertId,
          name_company: body.name_company,
          logo: body.logo,
          location: body.location,
          description: body.description
        };
        console.log("data", data)
        form.success (res, data);
      })
      .catch (err =>
        // reject
        console.log (err)
      );
  },
  patchCompany: (req, res) => {
    const {params, query} = req;

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
