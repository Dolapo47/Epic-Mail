import express from 'express';
import usercontroller from '../controllers/user';

const router = express.Router();

router.post('/signup', usercontroller.signUp);
router.post('/signin', usercontroller.signIn);
router.get('/', usercontroller.welcome);

export default router;
