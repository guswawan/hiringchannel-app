const db = require ('../Configs/db');

module.exports = {
  getAllUser: () => {
    return new Promise ((resolve, reject) => {
      const sql = 'SELECT * FROM user';
      db.query (sql, (err, result) => {
        if (!err) {
          resolve (result);
        } else {
          reject (err);
        }
      });
    });
  },
  getUser: username => {
    return new Promise ((resolve, reject) => {
      console.log("username ", username)
      const sql = `SELECT * FROM user WHERE username=?`
      console.log("sql", sql)
      db.query (sql, username,(err, result) => {
        console.log("result", result)
        if(!err) {
          resolve(result)
        }else{
          reject(err)
        }
      })
    });
  },
  postUser: user => {
    return new Promise ((resolve, reject) => {
      //const values = [user.username,user.password,user.role];
      const sql = `INSERT INTO user SET ?`;
      //const sql2 = 'INSET INTO user SET ? SELECT ? WHERE NOT EXIST(SELECT * FROM user WHERE username=?)'
      console.log("values", user)
      //console.log("sql2 ",sql2);
      db.query (sql, user, (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    })
  },
  // userCheck: (username) => {
  //   return new Promise((resolve, reject) => {
  //     const sql = 'SELECT username FROM user WHERE username = ?'
  //     console.log("sql ",sql)
  //       db.query(sql, username, (err, result) => {
  //         // if(result.length == 0 ) {

  //         // }
  //         console.log("username M ",result)
  //           if (!err) {
  //               resolve(result)
  //               console.log("result M ", result)
  //           } else {
  //               reject(err)
  //           }
  //       })
  //   })
  // },
  patchUser: (query, params) => {
    return new Promise ((resolve, reject) => {
      const sql = 'UPDATE user SET ? WHERE ?'
      db.query (sql, [query, params], (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    });
  },
  deleteUser: (id) => {
    return new Promise ((resolve, reject) => {
      const sql = `DELETE FROM user WHERE id = ?`
      db.query (sql, id, (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    });
  }
};
