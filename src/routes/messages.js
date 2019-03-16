import express from 'express';
import messageController from '../controllers/messages';

const router = express.Router();

router.post('/messages', messageController.createNewMessage);
router.get('/messages', messageController.getMessage);
router.get('/messages/unread', messageController.unreadMessages);
router.get('/messages/sent', messageController.sentMessages);
router.get('/messages/:id', messageController.getSingleMessage);
router.delete('/messages/:id', messageController.deleteMessage);

export default router;
