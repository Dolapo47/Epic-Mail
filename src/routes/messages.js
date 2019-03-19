import express from 'express';
import messagecontroller from '../controllers/messages';

const router = express.Router();

router.post('/messages', messagecontroller.createMessage);
router.get('/messages', messagecontroller.getMessage);
router.get('/messages/unread', messagecontroller.unreadMessages);
router.get('/messages/sent', messagecontroller.sentMessages);
router.get('/messages/:id', messagecontroller.getSingleMessage);
router.delete('/messages/:id', messagecontroller.deleteMessage);

export default router;
