exports.logout = (req, res) => {
  res.clearCookie('login');
  res.redirect('/login');
};
