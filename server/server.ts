import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import passport from 'passport';
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
app.patch('/saveArray/:name', UserController.saveArray);
app.patch('/deleteArray/:name', UserController.deleteArray);

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
