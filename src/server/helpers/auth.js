const authMiddleware = {
  checkAuthentication(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.redirect('/');
    } else {
      return next();
    }
  },
  currentUser(req, res, next) {
    // if the user is authenticated (passport method returns true when serialized)
    if (req.isAuthenticated()) {
      // this is available in the view for all requests, deserializing FTW
      res.locals.currentUser = req.user;
      return next();
    } else {
      return next();
    }
  },
  preventLoginSignup(req, res, next) {
    if (req.user) {
      return res.redirect(`/home`);
    } else {
      return next();
    }
  },
  ensureCorrectUser(req,res,next) {
    if (+req.params.id !== req.user.id) {
      return res.redirect(`/home`);
    } else {
      return next();
    }
  }
};

module.exports = authMiddleware;
