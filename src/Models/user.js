const db = require ('../Configs/db');

module.exports = {
  getUser: () => {
    return new Promise ((resolve, reject) => {
      const sql = `SELECT user.id_user, user.username, user.password, user.role, t_engineer.name_engineer, t_engineer.description, t_engineer.location
      FROM user
      JOIN t_engineer
      ON user.id_user=t_engineer.id_user
      UNION ALL
      SELECT user.id_user, user.username, user.password, user.role, t_company.name_company, t_company.description, t_company.location
      FROM user
      JOIN t_company
      ON user.id_user=t_company.id_user
      ORDER BY id_user`
      console.log("sql",sql)
      db.query (sql, (err, result) => {
        console.log("result ",result)
        if (!err) {
          resolve (result);
        } else {
          reject (err);
        }
      });
    });
  },
  getUserLogin: username => {
    return new Promise ((resolve, reject) => {
      console.log("username ", username)
      const sql = `SELECT * FROM user WHERE username='${username}'`
      console.log("sql", sql)
      db.query (sql, (err, result) => {
        console.log("result", result)
        if(!err) {
          resolve(result)
        }else{
          reject(err)
        }
      })
    });
  },
  postUser: data => {
    return new Promise ((resolve, reject) => {
      //const values = [user.username,user.password,user.role];
      const sql = `INSERT INTO user SET ?`;
      console.log("values ", data)
      db.query (sql, data, (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    })
  },
  userCheck: (username) => {
    return new Promise((resolve, reject) => {
      // const sql = `SELECT username FROM user WHERE username ='${username}'`
      // console.log("sql ",sql)
        db.query('SELECT username FROM user WHERE username = ?', username, (err, result) => {
          console.log("result ", result)
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
  },
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
