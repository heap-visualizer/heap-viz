import express from 'express';
const authRouter = express.Router();
import passport from 'passport';
import authControllers from '../config/authControllers.cjs';

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

export default authRouter;
