import express from 'express';
import groupController from '../controllers/group';

const router = express.Router();

router.post('/group', groupController.createGroup);
router.get('/group', groupController.fetchGroups);
router.get('/group/:id', groupController.fetchGroup);


export default router;
