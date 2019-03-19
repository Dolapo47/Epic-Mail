import express from 'express';
import groupController from '../controllers/group';

const router = express.Router();

router.post('/', groupController.createGroup);

export default router;
