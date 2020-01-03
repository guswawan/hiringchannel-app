const db = require ('../Configs/db');

module.exports = {
  //Ver1
  // getAllEngineer: (query) => {

  //   var sort = query.sort || 'ASC';
  //   var limit = query.limit || 2;
  //   var page = query.page || 1;
  //   var offset = (page-1)*limit;

  //   return new Promise ((resolve, reject) => {
  //     db.query (`SELECT COUNT(*) AS count FROM t_engineer`, (err, response) => {
  //       if(!err) {
  //         const countPage = Math.ceil(response[0].count/limit);
  //         const sql = `SELECT t_engineer.id,t_engineer.id_user, t_engineer.name_engineer, t_engineer.description, 
  //     GROUP_CONCAT(DISTINCT(t_skill.skill_item)) AS skill, t_engineer.location, 
  //     t_engineer.birth, t_engineer.link_showcase, t_engineer.date_created, t_engineer.date_updated FROM \`t_engineer\` 
  //     INNER JOIN \`t_skill\` ON \`t_skill\`.\`id_engineer\` = t_engineer.id 
  //     GROUP BY t_engineer.id 
  //     ORDER BY \`t_engineer\`.\`name_engineer\` ${sort}, \`skill\` ${sort}, \`date_updated\` ${sort} LIMIT ${limit} OFFSET ${offset}`;
      
  //     db.query (sql, (err, response, field) => {
  //       if (!err) {
  //         var next = []
  //         var prev = []
  //         if(next > countPage){
  //           next = countPage
  //         }
  //         for (i = parseInt(page)+1; 1<= countPage; i++){
  //           next.push(i)
  //         }
  //         for (i = parseInt(page)-1; 1 >= 1; i--){
  //           prev.push(i)
  //         }
  //         response = {
  //           countPage: countPage,
  //           prevPage: prev.length,
  //           currentPage: parseInt(page),
  //           nextPage: next.length,
  //           response
  //         }
  //         resolve (result);
  //       } else {
  //         reject (err);
  //       }
  //     });

  //       } else {
  //         reject (err)
  //       }
  //     }) 
      
  //   });
  // },
  //Ver2
  getAllEngineer: data => {

    var pages = ''
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

    if(data.sort_by == 'skill'){
      sort_by = `ORDER BY COUNT(DISTINCT skill.skill_name)`
    }else if(data.sort_by != undefined){
      sort_by = `ORDER BY ${data.sort_by}`
    }

    if(data.order != undefined){
      order = `${data.order}`
    }

    return new Promise ((resolve, reject) => {
      
      const sql = `SELECT t_engineer.id,t_engineer.id_user, t_engineer.name_engineer, t_engineer.description, 
      GROUP_CONCAT(DISTINCT(t_skill.skill_item)) AS skill, t_engineer.location, 
      t_engineer.birth, t_engineer.link_showcase, t_engineer.date_created, t_engineer.date_updated FROM t_engineer 
      INNER JOIN t_skill ON t_skill.id_engineer = t_engineer.id 
      ${find} GROUP BY t_engineer.id 
      ${sortBy} ${order} ${pages} `;
      
      db.query (sql, (err, result) => {
        if (!err) {
          resolve (result);
        } else {
          reject (err);
        }
      });
    });
  },
  getAllEngineerr: () => {
    return new Promise ((resolve, reject) => {

      const sql = `SELECT * FROM t_engineer`;
      db.query (sql, (err, response) => {
        if (!err) {
          resolve (response);
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
  getEngineerbyId: (id) => {
    return new Promise ((resolve, reject) => {
      const sql = `SELECT t_engineer.id,t_engineer.id_user, t_engineer.name_engineer, t_engineer.description, 
      GROUP_CONCAT(DISTINCT(t_skill.skill_item)) AS skill, t_engineer.location, 
      t_engineer.birth, t_engineer.link_showcase, t_engineer.date_created, t_engineer.date_updated FROM t_engineer 
      INNER JOIN t_skill ON t_skill.id_engineer = t_engineer.id WHERE t_engineer.id = ${id}`;
      db.query (sql,(err, result) => {
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
  postSkillEngineer: (query, params) => {
    return new Promise ((resolve, reject) => {
      console.log("params id ", params.id)
      const sql = 'INSERT INTO t_skill (skill_item, id_engineer) VALUES ( ?, ? ) ' ;
      console.log("sql", sql)
      db.query (sql, [query.skill_item, params.id], (err, result) => {
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
      const sql = `DELETE FROM t_skill WHERE skill_item ='${params.skill_item}'`;
      db.query (sql,(err, result) => {
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
