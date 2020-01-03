const db = require ('../Configs/db');

module.exports = {

  getAllProject: () => {
    return new Promise ((resolve, reject) => {

      const sql = `SELECT t_project.id_project, t_project.id_engineer, t_project.id_company, t_project.name_project, t_company.name_company, t_project.status_project, t_project.status_engineer
      FROM t_project
      INNER JOIN t_company
      ON t_project.id_company=t_company.id`;
      db.query (sql, (err, response) => {
        if (!err) {
          resolve (response);
        } else {
          reject (err);
        }
      });
    });
  },
  postProject: body => {
    return new Promise ((resolve, reject) => {
      console.log("body ",body)
      // const date_created = new Date();
      // const date_updated = new Date();
      const values = [body.name_project, body.id_engineer, body.id_company, body.status_project, body.status_engineer];
      const sql = `INSERT INTO t_project SET ?`;
      console.log("values", values);
      db.query (sql,[values] ,(err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    });
  },
  patchProject: (query, params) => {
    return new Promise ((resolve, reject) => {
      const sql = "UPDATE t_project SET ? WHERE ?";
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
  deleteProject: (id) => {
    return new Promise ((resolve, reject) => {
      const sql = "DELETE FROM t_project WHERE id = ?";
      db.query (sql, id, (err, result) => {
          if (!err) {
            resolve (result);
          } else {
            reject (err);
          }
        }
      );
    });
  },
  // getProfilEngineer: () => {
//   return new Promise ((resolve, reject) => {
//     const sql = `SELECT t_engineer.id,t_engineer.id_user, t_engineer.name_engineer, t_engineer.description, 
//     GROUP_CONCAT(DISTINCT(t_skill.skill_item)) AS skill, t_engineer.location, 
//     t_engineer.birth, t_engineer.link_showcase, t_engineer.date_created, t_engineer.date_updated FROM t_engineer 
//     INNER JOIN t_skill ON t_skill.id_engineer = t_engineer.id GROUP BY t_engineer.id `;
//     db.query (sql, (err, result) => {
//       if (!err) {
//         resolve (result);
//       } else {
//         reject (err);
//       }
//     });
//   });
// },
// getEngineerbyId: (id) => {
//   return new Promise ((resolve, reject) => {
//     const sql = `SELECT t_engineer.id,t_engineer.id_user, t_engineer.name_engineer, t_engineer.description, 
//     GROUP_CONCAT(DISTINCT(t_skill.skill_item)) AS skill, t_engineer.location, 
//     t_engineer.birth, t_engineer.link_showcase, t_engineer.date_created, t_engineer.date_updated FROM t_engineer 
//     INNER JOIN t_skill ON t_skill.id_engineer = t_engineer.id WHERE t_engineer.id = ${id}`;
//     db.query (sql,(err, result) => {
//       if (!err) {
//         resolve (result);
//       } else {
//         reject (err);
//       }
//     });
//   });
// },
};
