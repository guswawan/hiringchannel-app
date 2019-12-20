const db = require ('../Configs/db');

module.exports = {
  getSkillEngineer: () => {
    return new Promise ((resolve, reject) => {
      const sql = 'SELECT * FROM t_skill' ;
      console.log("sql", sql)
      db.query (sql, (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    });
  },
  postSkillEngineer: (body, params) => {
    return new Promise ((resolve, reject) => {
      console.log("params id ", params.id)
      const sql = 'INSERT INTO t_skill (skill_item, id_engineer) VALUES ( ?, ? ) ' ;
      console.log("sql", sql)
      db.query (sql, [body.skill_item, params.id], (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    });
  },
  patchSkillEngineer: (params, query) => {
    return new Promise ((resolve, reject) => {
      console.log("id enginere ",params.id_engineer)
      console.log("id skill ",query.skill_item)
      const sql = `UPDATE t_skill SET skill_item='${query.skill_item}' WHERE id_engineer='${params.id_engineer}'`;
      console.log("sql", sql)
      db.query (sql, (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    });
  },
  deleteSkillEngineer: (params) => {
    return new Promise ((resolve, reject) => {
      const sql = `DELETE FROM t_skill WHERE id_skill ='${params.id_skill}'`;
      db.query (sql, (err, result) => {
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
