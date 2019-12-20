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
    const {username, password, role} = req.body;
    console.log("req body ", req.body)
    const reU = /^[A-Z0-9_-]{4,}$/
    // const reP = /^[a-z0-9_-]{6,}$/
    // const validatePass = reP.test(password)
    // console.log("passwordvalid ", validatePass)
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = {username: username, password: hashedPassword, role: role};
  
    if (reU.test(username)) {
      // if (reP.test(password) == true) {
      //   bcrypt.hashSync(password, 8, (err, hashedPassword) => {
      //       const user = {username: username, password: hashedPassword, role: role};
      //       console.log("body", user)

            model
            .postUser (user)
            .then (result => {
              // resolve
              
              res.json (result)
              // if (result.length == 0) {
              // } else {
              //   return res.json({
              //     msg: 'Username already exist.'
              //   })
              // }
            })
            .catch (err =>
              // reject
              console.log (err)
            );
      // })
      // } else {
      //   return res.json({
      //     msg: 'Password invalid'
      //   })
      // }
    } else {
      return res.json({
        err: true,
        msg: 'Invalid username. Must more than 4 characters & use CAPITAL and/ number'
      })
    } 
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

    const {username,password} = req.body
    // const password = req.body.password?req.body.password:''
    if(!username){
        res.json({
            msg : 'Username required'
        })
    }else{
        model
        .getUser(username)
        .then(result=>{
            const role = result[0].role;
            const validatePassword = bcrypt.compareSync(password, result[0].password)
            if(!validatePassword){
                res.json({
                    message:'Invalid password.'
                })
            }else if(role == 'company'){ 
              jwt.sign({result}, process.env.SECRET_KEY, {expiresIn: '1h'}, (err, token)=>{
                  res.json({
                      message:'Company login success..',
                      data: result[0],
                      token: token
                  })
              })
            } else if(role == 'engineer'){
              jwt.sign({result}, process.env.ENG_SECRET_KEY, {expiresIn: '1h'}, (err, token)=>{
                res.json({
                    message:'Engineer login success..',
                    data: result[0],
                    token: token
                })
              })
            }
        })
        .catch(err=>{
            res.json({err})
        })
    }    
  }
  //===============
  //   const {body} = req;
  //   console.log(body)
    
  // {model
  //   .getUser(body)
  //   .then (result => {
  //     //resolve
  //     // res.json (result)

  //     const {password, username} = req.body;
  //     const user = {name: username}
  //     const hashedPassword = result[0].password;
  //     console.log("hashed ", hashedPassword)
  //     const role = result[0].role;
        
  //     if (bcrypt.compareSync(password, hashedPassword)) {
  //         if (role == 'company') {
  //           const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn:'1h'})
  //           return res.status(200).json({
  //             success: true,
  //             msg: 'Login success.',
  //             data: result[0],
  //             token: token
  //           })
  //         } else if (role == 'engineer') {
  //           const token = jwt.sign({username}, process.env.ENG_SECRET_KEY, {expiresIn:'1h'})
  //           return res.status(200).json({
  //             success: true,
  //             msg: 'Login success.',
  //             data: result[0],
  //             token: token
  //           })
  //         }
  //     } else {
  //       return res.json({
  //         success: false,
  //         msg: 'Invalid password.'
  //       })
  //     }
  //   })}
  //},
};