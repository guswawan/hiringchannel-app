const db = require ('../Configs/db');

module.exports = {
  getAllEngineer: () => {
    return new Promise ((resolve, reject) => {
      const sql = "SELECT t_engineer.id,t_engineer.name_engineer, t_engineer.description, GROUP_CONCAT(DISTINCT(t_skill.skill_item) SEPARATOR ', ') AS skill, t_engineer.location, t_engineer.birth, GROUP_CONCAT(DISTINCT(t_showcase.showcase_item) SEPARATOR ', ') AS link_showcase, t_engineer.date_created, t_engineer.date_updated FROM t_engineer INNER JOIN t_skill ON t_skill.id_engineer = t_engineer.id INNER JOIN t_showcase ON t_showcase.id_engineer = t_engineer.id GROUP BY t_engineer.id";
      db.query (sql, (err, result) => {
        if (!err) {
          resolve (result);
        } else {
          reject (err);
        }
      });
    });
  },
  getEngineer: (id) => {
    return new Promise ((resolve, reject) => {
      const sql = "SELECT t_engineer.id,t_engineer.name_engineer, t_engineer.description, GROUP_CONCAT(DISTINCT(t_skill.skill_item) SEPARATOR ', ') AS skill, t_engineer.location, t_engineer.birth, GROUP_CONCAT(DISTINCT(t_showcase.showcase_item) SEPARATOR ', ') AS link_showcase, t_engineer.date_created, t_engineer.date_updated FROM t_engineer INNER JOIN t_skill ON t_skill.id_engineer = t_engineer.id INNER JOIN t_showcase ON t_showcase.id_engineer = t_engineer.id WHERE t_engineer.id=?";
      db.query (sql, id, (err, result) => {
        if (!err) {
          resolve (result);
        } else {
          reject (err);
        }
      });
    });
  },
  postEngineer: body => {
    return new Promise ((resolve, reject) => {
      const values = [body.name_engineer, body.description, body.location, body.birth, body.date_created, body.date_updated];
      const sql = 'INSERT INTO t_engineer (name_engineer,description,location,birth,date_created,date_updated) VALUES ( ? )';
      console.log("values", values)
      db.query (sql, [values], (err, result) => {
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