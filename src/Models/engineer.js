const db = require ('../Configs/db');
module.exports = {
  getAllEngineer: () => {
    return new Promise ((resolve, reject) => {
      const sql = "SELECT t_engineer.id,t_engineer.name_engineer, t_engineer.description, GROUP_CONCAT(DISTINCT(t_skill.skill_item) SEPARATOR ', ') AS skill, t_engineer.location, t_engineer.birth, GROUP_CONCAT(DISTINCT(t_showcase.showcase_item) SEPARATOR ', ') AS link_showcase, t_engineer.date_created, t_engineer.date_updated FROM t_engineer JOIN t_skill ON t_engineer.id = t_skill.id_engineer JOIN t_showcase ON t_showcase.id_engineer = t_engineer.id GROUP BY t_engineer.id";
      db.query (sql, (err, result) => {
        if (!err) {
          resolve (result);
        } else {
          reject (err);
        }
      });
    });
  },
  postEngineer: data => {
    return new Promise ((resolve, reject) => {
      const sql = 'INSERT INTO t_engineer SET ?';
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
  patchEngineer: (query, params) => {
    return new Promise ((resolve, reject) => {
      const sql = 'UPDATE t_engineer SET ? WHERE ?';
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
  deleteEngineer: (id) => {
    return new Promise ((resolve, reject) => {
      const sql = `DELETE FROM t_engineer WHERE id = ?`;
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
