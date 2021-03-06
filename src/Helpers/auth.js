const jwt = require ('jsonwebtoken');

module.exports = {
  verifyCompany:  (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.SECRET_KEY, (err, id_user) => {
        if(err) return res.sendStatus(403)
        req.id_user = id_user
  
        next()
    })
  },
  verifyEngineer:  (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ENG_SECRET_KEY, (err, id_user) => {
        if(err) return res.sendStatus(403)
        req.id_user = id_user

        next()
    })
  },
};
