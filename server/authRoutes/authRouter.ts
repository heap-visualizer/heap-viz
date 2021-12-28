import express from 'express';
const authRouter = express.Router();
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../models/user';
// import authControllers from '../config/authControllers.cjs';

authRouter.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'Login successfull',
      user: req.user,
    });
  }
});

authRouter.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Login failure',
  });
});

authRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/login/success',
    failureRedirect: '/login/failure',
    failureFlash: true,
  })
);

authRouter.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
    });
    const result = await user.save();
    return res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    // res.redirect('/signup');
  }
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'You have logged out successfully' });
  res.redirect('/login');
});

export default authRouter;
