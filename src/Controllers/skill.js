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
  
  patchSkillEngineer: (req, res) => {
    const {params, query} = req;
    console.log("params ", params)
    console.log("query ", query)
  
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

  deleteSkillEngineer: (req, res) => {
    const {params} = req;
 
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
