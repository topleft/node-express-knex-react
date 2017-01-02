const passportLocal = require('passport-local');
const knex = require('../db/connection');
const passwordHelpers = require('./password');

module.exports = (passport) => {
  passport.use(new passportLocal.Strategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]',
    passReqToCallback: true
  },
  (req, username, password, done) => {
    knex('users').where({ username: username }).first()
      .then((user) => {
        console.log(user);
        if (!user) {
          return done(null, false, req.flash('loginMessage','Incorrect username.'));
        }
        if (!passwordHelpers.comparePass(password, user.password)) {
          return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
        }
        else {
          return done(null, user);
        }
      })
      .catch((err) => {
        return done(err);
      });
  }));

  passport.serializeUser((user, done) => {
    done(null, {
      id: user.id,
      username: user.username
    });
  });

  passport.deserializeUser((user, done) => {
    knex('users').where({id: user.id}).first()
      .then((user) => {
        done(null, user);
      }).catch((err) => {
        done(err,null);
      });
  });
};
