const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401)
    .json({ message: 'tsk, tsk, you are not authorized. Prove you are worthy by signing in!' });
};

module.exports = ensureAuthenticated;
