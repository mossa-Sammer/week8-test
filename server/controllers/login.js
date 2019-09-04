const { join } = require('path');
const bycrptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUser = require('../database/queries/getUser');
require('env2')('config.env');

exports.renderLogin = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
};

exports.userLogin = (req, res, next) => {
  getUser(req.body)
    .then((storedUser) => {
      if (storedUser.rows.length === 0) {
        throw Error('user not found');
      }
      return bycrptjs.compare(req.body.password, storedUser.rows[0].password);
    })
    .then((authed) => {
      if (authed) {
        jwt.sign({ email: req.body.email }, process.env.PRIVATE_KEY, (err, result) => {
          if (err) {
            next(err);
          } else {
            res.cookie('login', result);
            res.redirect('/cities');
          }
        });
      } else {
        res.send('/login');
      }
    })
    .catch((err) => {
      if (err.message === 'user not found') {
        res.send('user not found');
      } else next(err);
    });
};
