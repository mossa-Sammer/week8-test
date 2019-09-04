const jwt = require('jsonwebtoken');
require('env2')('config.env');

exports.userAuthorization = (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  jwt.verify(req.cookies.login, process.env.PRIVATE_KEY, (err, result) => {
    if (err) {
      res.clearCookie('login');
      res.redirect('/login');
    } else {
      next();
    }
  });
};

exports.notUser = (req, res, next) => {
  if (!req.cookies.login) { next(); } else res.redirect('/cities');
};
