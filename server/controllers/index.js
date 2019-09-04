const express = require('express');

const error = require('./error');
const city = require('./city');
const signup = require('./signup');
const login = require('./login');
const { userAuthorization, notUser } = require('./auth');
const { logout } = require('./logout');

const router = express.Router();

router.route('/signup')
  .get(notUser, signup.renderSignup)
  .post(notUser, signup.postUser);

router.route('/login')
  .get(notUser, login.renderLogin)
  .post(notUser, login.userLogin);

// router.get('/login', login.renderLogin);


// protected routes
router.use(userAuthorization);
router.get('/cities', city.renderCities);
router.get('/all-cities', city.getAllCities);
router.post('/add-city', city.add);
router.get('/logout', logout);

router.use(error.client);
router.use(error.server);

module.exports = router;
