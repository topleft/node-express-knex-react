const express = require('express');
const router = express.Router();
const authHelpers = require('../helpers/auth');
const passwordHelpers = require('../helpers/password');
const knex = require('../db/connection');
const passport = require('passport');


router.get('/spacegoat', function (req, res, next) {
  console.log('here?');
  return res.send({message: 'Welcome to Space Goat!!!'})
});

router.get('/loginFailed', function (req, res, next) {
  return res.send({status: 401, message: 'Authentication failed.'})
});

router.post('/register', authHelpers.preventLoginSignup, (req, res, next)  => {
  passwordHelpers.createUser(req)
    .then((user) => {
      req.login(user[0], (err)  => {
        if (err) {
          console.log(err);
          return next(err);
        }
        return res.json({status: 200, message: `Success, ${user[0].username} is now registered`});
      })(req, res, next);
    })
    .catch((err) => {
      if (err) {
        res.json(err);
      } else {
        res.json({status: 500, message: 'Regsitration failed'});
      }
    });
});

// authenticate users when logging in - no need for req,res passport does this for us
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/loginFailed'
  }), (req, res) => {
    let user = Object.assign({}, {id: req.user.id, username: req.user.username})
    res.json({status: 200, message: 'success', user: user})
  });

router.get('/logout', authHelpers.checkAuthentication, (req,res) => {
  // req.logout added by passport - delete the user id/session
  req.logout();
  res.redirect('/');
});

router.get('/current_user', authHelpers.checkAuthentication, (req,res) => {
  //
  res.json(req.user)
});

module.exports = router;
