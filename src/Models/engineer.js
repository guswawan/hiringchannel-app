const db = require ('../Configs/db');

module.exports = {
  getAllEngineer: data => {

    var pages = ``
    var find = ''
    var sortBy = ''
    var order = ''

    if(data.limit != undefined && data.page != undefined) {
      data.page = data.limit*(data.page-1)
      pages = `LIMIT ${data.limit} OFFSET ${data.page}`
    }

    if(data.name_engineer != undefined) {
      find = `WHERE t_engineer.name_engineer LIKE '%${data.name_engineer}%'`
    } else if (data.skill != undefined) {
      find = `WHERE t_skill.skill_item LIKE '%${data.skill}%'`
    }

    if(data.sortBy == 'skill') {
      sortBy = `ORDER BY COUNT(DISTINCT t_skill.skill_item)` 
    }
     else if (data.sortBy != undefined) {
      sortBy = `ORDER BY ${data.sortBy}`
    }

    if(data.order != undefined) {
      order = `ORDER BY ${data.order}`
    }

    return new Promise ((resolve, reject) => {
      const sql = `SELECT t_engineer.id,t_engineer.id_user, t_engineer.name_engineer, t_engineer.description, 
      GROUP_CONCAT(DISTINCT(t_skill.skill_item)) AS skill, t_engineer.location, 
      t_engineer.birth, t_engineer.link_showcase, t_engineer.date_created, t_engineer.date_updated FROM t_engineer 
      INNER JOIN t_skill ON t_skill.id_engineer = t_engineer.id 
      ${find} GROUP BY t_engineer.id 
      ${pages} ${sortBy} ${order}`;
      // console.log("sql ",sql)
      db.query (sql, (err, result) => {
        if (!err) {
          resolve (result);
        } else {
          reject (err);
        }
      });
    });
  },
  getProfilEngineer: () => {
    return new Promise ((resolve, reject) => {
      const sql = `SELECT t_engineer.id,t_engineer.id_user, t_engineer.name_engineer, t_engineer.description, 
      GROUP_CONCAT(DISTINCT(t_skill.skill_item)) AS skill, t_engineer.location, 
      t_engineer.birth, t_engineer.link_showcase, t_engineer.date_created, t_engineer.date_updated FROM t_engineer 
      INNER JOIN t_skill ON t_skill.id_engineer = t_engineer.id GROUP BY t_engineer.id `;
      db.query (sql, (err, result) => {
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
      //console.log("body ",body)
      const date_created = new Date();
      const date_updated = new Date();
      const values = [body.name_engineer,body.description,body.location,body.birth, body.link_showcase, date_created,date_updated, body.id_user];
      const sql = 'INSERT INTO t_engineer (name_engineer,description,location,birth,link_showcase,date_created,date_updated, id_user) VALUES ( ? )';
      // console.log("values", values);
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
      const sql = "UPDATE t_engineer SET ? WHERE ?";
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
      const sql = "DELETE FROM t_engineer WHERE id = ?";
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
  //SKILL
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
