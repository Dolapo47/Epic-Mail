import express from 'express';
import userControllers from '../controllers/user';

const router = express.Router();

// eslint-disable-next-line consistent-return
router.post('/signup', userControllers.createSignUp);
router.post('/signin', userControllers.createSignIn);
router.get('/', userControllers.welcome);

export default router;
