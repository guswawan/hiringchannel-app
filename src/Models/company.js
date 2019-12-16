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
  postCompany: data => {
    return new Promise ((resolve, reject) => {
      const sql = 'INSERT INTO t_company SET ?'
      db.query (sql, data, (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    });
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
