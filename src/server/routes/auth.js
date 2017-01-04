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
//
// router.post('/register', authHelpers.preventLoginSignup, (req, res, next)  => {
//   passwordHelpers.createUser(req)
//     .then((user) => {
//       req.login(user[0], (err)  => {
//         if (err) {
//           console.log(err);
//           return next(err);
//         }
//         return res.send({status: 200, message: `Success, ${user[0].username} is now registered`});
//       })(req, res, next);
//     })
//     .catch((err) => {
//       if (err.constraint === 'users_username_unique') {
//         err.message = 'username is already taken';
//       }
//       if (err) {
//         res.send({err});
//       } else {
//         res.render('error', {err});
//       }
//     });
// });

// authenticate users when logging in - no need for req,res passport does this for us
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/spacegoat'
  }), (req, res) => {
    res.json({status: 200, message: 'success'})
  });

router.get('/logout', authHelpers.checkAuthentication, (req,res) => {
  // req.logout added by passport - delete the user id/session
  req.logout();
  res.redirect('/');
});

module.exports = router;
