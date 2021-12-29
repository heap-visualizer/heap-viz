import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/user';
import bcrypt from 'bcrypt';
import session from 'express-session';
import flash from 'connect-flash';

dotenv.config({ path: './.env' });
import authRouter from './authRoutes/authRouter';
import UserController from './controllers/UserController';

const app = express();
const port = process.env.PORT || 3000;

// if (process.env.NODE_ENV === 'production') {
//     app.get('/', (req, res) => {
//         return res.status(200).sendFile(path.resolve(__dirname, '../build/index.html'));
//         });
// };
//app.use('/', express.static(path.join(__dirname, '../src/index.html')))

/*adding local strategy and user model
adding local strategy for authentication */

/*
passport.use(
  new LocalStrategy(function (username: String, password: string, done: any) {
    User.findOne({ username: username }, function (err: Error, user: any) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(
        password,
        user.password,
        (err: Error, isMatch: Boolean) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password' });
          }
        }
      );
    });
  })
);

passport.serializeUser((user, done) => done(null, user._id: any));

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err: Error, user: any) {
    done(err, user);
  });
});
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: 'heapsecret',
    resave: true,
    saveUninitialized: true,
  })
);

// initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
//testing endpoints
app.use('/auth', authRouter);
app.post('/saveArrays/:name', UserController.saveArrays);
app.get('/getArrays/:name', UserController.getArrays);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@immersive.wo6r5.mongodb.net/heap?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('db connected!!!!!');
  })
  .catch((err) => {
    console.error(err.message);
  });

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

export default app;
