module.exports = function(app, db){

  app.post('/signup', (req, res) => {
    const result = validateSignUpForm(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
        errors: result.errors,
      });
    }

    return res.status(200).end();
  });

  app.post('/login', (req, res) => {
    const result = validateLoginForm(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
        errors: result.errors,
      });
    }

    return res.status(200).end();
  });
}
