const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./user-model.js');
const { jwtSecret } = require('./secrets.js');

router.post('/createuser', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  User.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/loginuser', (req, res) => {
  let { email, password } = req.body;

  User.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(200).json({
          message: `Welcome ${user.email}!`,
          token,
          id: user.id
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user){
  const payload = {
    subject: user.id,
    email: user.email
  };

  const options = {
    expiresIn: '3h',
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router
module.exports.generateToken = generateToken