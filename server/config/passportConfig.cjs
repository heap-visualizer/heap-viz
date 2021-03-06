import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user';
const LocalStrategy = passportLocal.Strategy;

function initialize(passport) {
  console.log('passport initialized');
  const authenticateUser = (username, password, done) => {
    User.findOne({
      username: username,
    })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'User does not exist' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password' });
          }
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  passport.use(
    new LocalStrategy(
      { usernameField: 'username', passwordField: 'password' },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}

export default initialize;
