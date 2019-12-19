const model = require ('../Models/user');
const form = require ('../Helpers/form');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

module.exports = {
  getAllUser: (_, res) => {
    model
      .getAllUser ()
      .then (result => {
        //resolve
        form.success (res, result);
      })
      .catch (err => {
        //reject
        console.log (err);
      });
  },
  getUser: (req, res) => {
    const {id} = req.params;
    model
      .getUser (id)
      .then (result => {
        //resolve
        form.success (res, result);
      })
      .catch (err => {
        //reject
        console.log (err);
      });
  },
  postUser: (req, res) => {
    //const {body} = req;
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = {username: req.body.username, password: hashedPassword, role: req.body.role};
    console.log("body", user)
    model
      .postUser (user)
      .then (result => {
        // resolve
        res.json (result)
      })
      .catch (err =>
        // reject
        console.log (err)
      );
  },
  patchUser: (req, res) => {
    const {params, query} = req;
    query.password = bcrypt.hashSync(query.password, 8);
    // res.json ({
    //   params,
    //   query,
    // });
    model
      .patchUser (query, params)
      .then (result => {
        //resolve
        res.json ({
          msg: 'update success.',
          result: result
        });
      })
      .catch (err =>
        //reject
        console.log (err)
      );
  },
  deleteUser: (req, res) => {
    const {id} = req.params;
    // res.json ({
    //   params,
    //   query,
    // });
    model
      .deleteUser (id)
      .then (result => {
        //resolve
        res.json (result);
      })
      .catch (err =>
        //reject
        console.log (err)
      );
  },

  login: (req, res) => {
    const {username} = req.body;

    model
      .getUser(username)
      .then (result => {
        //resolve
        // res.json (result)
        // console.log("result ", result)
        const user_id = result[0].id;
        //console.log("username ", username)
        const hashedPassword = result[0].password;
        const role = result[0].role;
        //console.log("has pas ", hashedPassword)
        const {password} = req.body;
       if (bcrypt.compareSync(password, hashedPassword)) {
            if (role == 'company') {
              const token = jwt.sign({user_id: user_id}, process.env.SECRET_KEY, {expiresIn:'15s'})
              return res.status(200).json({
                success: true,
                msg: 'Login success.',
                data: result[0],
                token: token
              })
            } else if (role == 'engineer') {
              const token = jwt.sign({user_id: user_id}, process.env.SECRET_KEY, {expiresIn:'15s'})
              return res.status(200).json({
                success: true,
                msg: 'Login success.',
                data: result[0],
                token: token
              })
            }
        } else {
          return res.json({
            success: false,
            msg: 'Invalid password.'
          })
        }
      })
      .catch (err => {
        //reject
        console.log(err)
      })
  },
};