const model = require ('../Models/engineer');
const form = require ('../Helpers/form');

module.exports = {
  //Ver.1
  // getAllEngineer: (req, res) => {
  //   const {query} = req;
    
  //   model.getAllEngineer (query)
  //     .then (response=> {
  //       //resolve
  //       form.success (res, response);
  //     })
  //     .catch (err => {
  //       //reject
  //       console.log (err);
  //     });
  // },
  //Ver.2
  getAllEngineer: (req, res) => {
    const {name_engineer, skill, limit, page, sorbBy, order} = req.query;
    const data = { name_engineer,skill,limit,page,sorbBy, order };
    
    model.getAllEngineerr ()
      .then (response=> {
        //resolve
        // form.success (res, response);
        console.log("respon", response.length)
        console.log("req query ", req.query.limit)
        console.log("Math ceil", Math.ceil(response.length / req.query.limit))
          model.getAllEngineer (data)
          .then (result=> {
          //resolve
          res.json({
            status: 200,
            msg:'success',
            countdata: response.length,
            currentpage: req.query.page + " From " + Math.ceil(response.length / req.query.limit) + " pages",
            //previous: response.length-currentpage, 
            result
          })
          })
          .catch (err => {
            //reject
            console.log (err);
          });
      })
      .catch (err => {
        //reject
        console.log (err);
      });
  },
  getProfilEngineer: (req, res) => {

    model
      .getProfilEngineer ()
      .then (result=> {
        console.log("result ", req.id_user.id_user)
        //resolve
        form.success (res, result.filter(result => result.id_user == req.id_user.id_user));
      })
      .catch (err => {
        //reject
        console.log (err);
      });
  },
  getEngineerbyId: (req, res) => {
    const id = req.params.id
    console.log("IKI ID ", id)

    model
      .getEngineerbyId (id)
      .then (result=> {
        //resolve
        res.json(result)
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
          date_updated: new Date(),
          id_user: req.body.id_user,
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
  //SKILL
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
    const {query} = req;

    model
      .postSkillEngineer (query, params)
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
