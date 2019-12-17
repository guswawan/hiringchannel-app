const model = require ('../Models/showcase');
const form = require ('../Helpers/form');

module.exports = {
  postShowcaseEngineer: (req, res) => {
    const {params} = req;
    const {body} = req;
    // console.log("body", body)
    // console.log("id params controller", params)
    model
      .postShowcaseEngineer (body, params)
      .then (result => {
        //resolve
        res.json(result)
      })
      .catch (err =>
        // reject
        console.log (err)
      );
  },
  //=== BUG ===
  patchShowcaseEngineer: (req, res) => {
    const {params, query} = req;
    console.log("params ", params)
    console.log("query ", query)
    // res.json ({
    //   params,
    //   query,
    // });
    model
      .patchShowcaseEngineer (query, params)
      .then (result => {
        //resolve
        res.json (result);
      })
      .catch (err =>
        //reject
        console.log (err)
      );
  },
  //=== END BUG ===
  deleteShowcaseEngineer: (req, res) => {
    const {id_showcase} = req.params;
    // res.json ({
    //   params,
    //   query,
    // });
    model
      .deleteShowcaseEngineer (id_showcase)
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
