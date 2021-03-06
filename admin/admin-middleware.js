const jwt = require("jsonwebtoken"); // <<< install this npm package

const { adminSecret } = require('./adminSecret.js');

module.exports = (req, res, next) => {
  const { authorization, key } = req.headers;
  
  if (authorization && key === process.env.ADMIN_KEY) {
    jwt.verify(authorization, adminSecret, (err, decodedToken) => {
      if(err){
        res.status(401).json({ message: 'invalid Credentials' })
      } else {
        req.decodedToken = decodedToken

        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No credentials provided' })
  }
};