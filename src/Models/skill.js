const db = require ('../Configs/db');

module.exports = {
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
  //=== BUG ===
  patchSkillEngineer: (query, params) => {
    return new Promise ((resolve, reject) => {
      console.log("id enginere ",params.id_engineer)
      console.log("id skill ",params.id_skill)
      const sql = 'UPDATE t_skill SET ? WHERE id_skill=?';
      console.log("sql", sql)
      db.query (sql, [query, params.id_engineer, params.id_skill], (err, result) => {
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
  deleteSkillEngineer: (id_skill) => {
    return new Promise ((resolve, reject) => {
      const sql = `DELETE FROM t_skill WHERE id_skill = ?`;
      db.query (sql, id_skill, (err, result) => {
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
