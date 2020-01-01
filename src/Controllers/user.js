const model = require ('../Models/user');
const form = require ('../Helpers/form');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

module.exports = {
getUser: (req, res) => {
    model
      .getUser ()
      .then (result => {  
        console.log("result", req.id_user)
        //resolve
        form.success(res, result);
        // form.success (res, result.filter(result => result.id_user == req.id_user.id_user));
      })
      .catch (err => {
        //reject
        console.log (err);
      });
  },
  postUser: (req, res) => {
    const {username, password, role} = req.body;
    const reU = /^[A-Z0-9_-]{4,}$/
    const reP = /^[a-z0-9_-]{6,}$/
    
    model
      .userCheck(username)
      .then(resultQuery => {
        console.log("result ", resultQuery)
        if (resultQuery.length === 0){
          if (reU.test(username) == true) {
              if (reP.test(password) == true){
                bcrypt.genSalt(8, (err,salt) => {
                  bcrypt.hash(password, salt, (err, hashedPassword) => {
                      const data = { username, password: hashedPassword, role }
        
                    model
                      .postUser(data)
                      .then(result => {
                          res.status(200).json({
                              success: true,
                              msg: 'Registration successfully.',
                              data: result
                          })
                        })
                        .catch(err => {
                            console.log(err)
                            res.json({
                                err: err,
                                success: false,
                                msg: 'Registration failed.'
                            })
                        })
                      })
                  })
              }else{
                res.json({
                  success: false,
                  msg: 'Invalid password.',
                })
              }
            }else{
              res.json({
                success: false,
                msg: 'Invalid username',
              })
            } 
          }else {
            res.json({
                // status: 400,
                success: false,
                msg: 'User already exist...'
            })
            }
        })
          .catch(err => {
            res.json({
              success: false,
              err: err
            })
              console.log(err)
        });  
  },
  patchUser: (req, res) => {
    const {params, query} = req;
    // query.password = bcrypt.hashSync(query.password, 8);

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
    const {username,password} = req.body
    if(!username){
        res.status(403).json({
            success: false,
            msg : 'Username required'
        })
    }else{
        model
        .getUserLogin(username)
        .then(result=>{
          console.log("RESULT ", result)
            const id_user = result[0].id_user;
            console.log("id_user", id_user)
            const role = result[0].role;
            console.log("ROL", role)
            const comparePass = bcrypt.compareSync(password, result[0].password)
            if(!comparePass){
                res.status(403).json({
                    success: false,
                    message:'Invalid password.'
                })
            }else if(role == 'company'){ 
              jwt.sign({id_user: id_user}, process.env.SECRET_KEY, {expiresIn: '24h'}, (err, token)=>{
                  res.status(200).json({
                      success: true,
                      message:'Company login success..',
                      data: result[0],
                      token: token
                  })
              })
            } else if(role == 'engineer'){
              jwt.sign({id_user: id_user}, process.env.ENG_SECRET_KEY, {expiresIn: '24h'}, (err, token)=>{
                res.status(200).json({
                    success: true,
                    message:'Engineer login success..',
                    data: result[0],
                    token: token
                })
              })
            }
        })
        .catch(err=>{
          console.log(err)
            res.status(403).json({
              success: false,
              msg: "Invalid username and password."
            })
        })
    }    
  }
};