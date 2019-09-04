const { join } = require('path');
const bcryptjs = require('bcryptjs');
const insertUser = require('../database/queries/addUser');

exports.renderSignup = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
};

exports.postUser = (req, res, next) => {
  // hashing password
  bcryptjs.genSalt(10)
    .then((salt) => bcryptjs.hash(req.body.password, salt))
    .then((hashedPassword) => {
      req.body.password = hashedPassword;
      return insertUser(req.body);
    })
    .then(res.redirect('/'))
    .catch((err) => {
      if (err.message.includes('unique')) {
        res.send('user already here');
      } else {
        next(err);
      }
    }); // end of catch
};// end of middleware
