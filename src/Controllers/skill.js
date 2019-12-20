const model = require ('../Models/skill');
const form = require ('../Helpers/form');

module.exports = {
  getSkillEngineer: (_, res) => {
    
    model
      .getSkillEngineer ()
      .then (result => {
        //resolve
        res.json(result)
      })
      .catch (err =>
        // reject
        console.log (err)
      );
  },
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
      .patchSkillEngineer (params, query)
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
  deleteSkillEngineer: (req, res) => {
    const {params} = req;
    // res.json ({
    //   params,
    //   query,
    // });
    model
      .deleteSkillEngineer (params)
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
