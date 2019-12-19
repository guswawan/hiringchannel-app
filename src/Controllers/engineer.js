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
  getEngineer: (req, res) => {
    const {id} =req.params
    // console.log("id", id)
    model
      .getEngineer (id)
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
  },
  findEngineer: (req, res) => {
    const {query} = req;
    console.log("query ", query)
    // console.log("skill ", skill)
    model
      .findEngineer(query)
      .then(result => {
        console.log("result ",result)
          res.json({result})
      })
      .catch(err => {
          res.json({err})
      })
    },
    // sortEngineer: (req, res) => {
    //   const {query} = req;
    //   console.log("query ", query)
    //   // console.log("skill ", skill)
    //   model
    //     .findEngineer(query)
    //     .then(result => {
    //       console.log("result ",result)
    //         res.json({result})
    //     })
    //     .catch(err => {
    //         res.json({err})
    //     })
    //   },
    pagesEngineer: (req, res) => {
      const {query} = req;
      console.log("query ", query)
      // console.log("skill ", skill)
      // model
      //   .findEngineer(query)
      //   .then(result => {
      //     console.log("result ",result)
      //       res.json({result})
      //   })
      //   .catch(err => {
      //       res.json({err})
      //   })
      },
};
