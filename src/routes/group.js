import express from 'express';
import groupController from '../controllers/group';

const router = express.Router();

router.post('/group', groupController.createGroup);
router.get('/group', groupController.fetchGroups);

export default router;
