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
    //  else if (data.sortBy != undefined) {
    //   sortBy = `ORDER BY ${data.sortBy}`
    // }

    if(data.order != undefined) {
      order = `ORDER BY ${data.order}`
    }

    return new Promise ((resolve, reject) => {
      const sql = `SELECT t_engineer.id,t_engineer.name_engineer, t_engineer.description, GROUP_CONCAT(DISTINCT(t_skill.skill_item) SEPARATOR ', ') AS skill, t_engineer.location, t_engineer.birth, t_engineer.date_created, t_engineer.date_updated FROM t_engineer INNER JOIN t_skill ON t_skill.id_engineer = t_engineer.id 
      ${find} GROUP BY t_engineer.id 
      ${pages} ${sortBy} ${order}`;
      console.log("sql ",sql)
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
      const sql = `SELECT t_engineer.id,t_engineer.name_engineer, t_engineer.description, GROUP_CONCAT(DISTINCT(t_skill.skill_item) SEPARATOR ', ') AS skill, t_engineer.location, t_engineer.birth, GROUP_CONCAT(DISTINCT(t_showcase.showcase_item) SEPARATOR ', ') AS link_showcase, t_engineer.date_created, t_engineer.date_updated FROM t_engineer INNER JOIN t_skill ON t_skill.id_engineer = t_engineer.id GROUP BY t_engineer.id`;
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
      const values = [body.name_engineer,body.description,body.location,body.birth, body.link_showcase, date_created,date_updated];
      const sql = 'INSERT INTO t_engineer (name_engineer,description,location,birth,link_showcase,date_created,date_updated) VALUES ( ? )';
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
};
