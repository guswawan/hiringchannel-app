const db = require ('../Configs/db');
module.exports = {
  getAllCompany: () => {
    return new Promise ((resolve, reject) => {
      const sql = 'SELECT * FROM t_company';
      db.query (sql, (err, result) => {
        if (!err) {
          resolve (result);
        } else {
          reject (err);
        }
      });
    });
  },
  getCompany: () => {
    return new Promise ((resolve, reject) => {
      const sql = 'SELECT * FROM t_company';
      db.query (sql,(err, result) => {
        if (!err) {
          resolve (result);
        } else {
          reject (err);
        }
      });
    });
  },
  postCompany: body => {
    return new Promise ((resolve, reject) => {
      const values = [body.name_company,body.logo,body.location,body.description,body.id_user];
      const sql = 'INSERT INTO t_company (name_company,logo,location,description, id_user) VALUES ( ? )';
      // console.log("values", values)
      db.query (sql,[values], (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    })
  },
  patchCompany: (query, params) => {
    return new Promise ((resolve, reject) => {
      const sql = 'UPDATE t_company SET ? WHERE ?'
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
  deleteCompany: (id) => {
    return new Promise ((resolve, reject) => {
      const sql = `DELETE FROM t_company WHERE id = ?`
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
