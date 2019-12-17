const model = require ('../Models/skill');
const form = require ('../Helpers/form');

module.exports = {
  postSkillEngineer: (req, res) => {
    const {params} = req;
    const {body} = req;
    // console.log("body", body)
    // console.log("id params controller", params)
    model
      .postSkillEngineer (body, params)
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
  patchSkillEngineer: (req, res) => {
    const {params, query} = req;
    console.log("params ", params)
    console.log("query ", query)
    // res.json ({
    //   params,
    //   query,
    // });
    model
      .patchSkillEngineer (query, params)
      .then (result => {
        //resolve
        res.json (result);
      })
      .catch (err =>
        //reject
        console.log (err)
      );
  },
  //=== BUG ===
  deleteSkillEngineer: (req, res) => {
    const {id_skill} = req.params;
    // res.json ({
    //   params,
    //   query,
    // });
    model
      .deleteSkillEngineer (id_skill)
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
