const db = require ('../Configs/db');

module.exports = {
  postShowcaseEngineer: (body, params) => {
    return new Promise ((resolve, reject) => {
      console.log("params id ", params.id)
      const sql = 'INSERT INTO t_showcase (showcase_item, id_engineer) VALUES ( ?, ? ) ' ;
      console.log("sql", sql)
      db.query (sql, [body.showcase_item, params.id], (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    });
  },
  //=== BUG ===
  patchShowcaseEngineer: (query, params) => {
    return new Promise ((resolve, reject) => {
      console.log("id enginere ",params.id_engineer)
      console.log("id showcase ",params.id_showcase)
      const sql = 'UPDATE t_showcase SET ? WHERE id_engineer=?';
      console.log("sql", sql)
      db.query (sql, [query, params.id_showcase, params.id_engineer], (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    });
  },
  //=== END BUG ===
  deleteShowcaseEngineer: (id_showcase) => {
    return new Promise ((resolve, reject) => {
      const sql = `DELETE FROM t_showcase WHERE id_showcase = ?`;
      db.query (sql, id_showcase, (err, result) => {
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
