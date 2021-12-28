import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import user from '../models/user';
const LocalStrategy = passportLocal.Strategy;

function initialize(passport) {
  console.log('passport initialized');
  const authenticateUser = (username: string, password, done) => {
    user
      .findOne({
        username: username,
      })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'User does not exist' });
        }

        bcrypt.compare(password, user.pasword, (err, isMatch) => {
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
    user.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
