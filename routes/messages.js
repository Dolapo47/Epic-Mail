import express from 'express';
import { messageDetails } from '../db/userDB';

const router = express.Router();

// eslint-disable-next-line consistent-return
router.post('/messages', (req, res) => {
  const message = {
    id: messageDetails.length + 1,
    createdOn: new Date(),
    subject: req.body.subject,
    message: req.body.message,
    parentId: 1,
    status: req.body.status,
  };
  messageDetails.push(message);
  res.status(201).json({
    status: 201,
    data: message,
  });
});

router.get('/messages', (req, res) => {
  res.status(200).json({
    status: 200,
    messages: messageDetails,
  });
});

router.get('/messages/sent', (req, res) => {
  const readMessages = messageDetails.filter(message => message.status === 'sent');
  res.status(200).json({
    status: 200,
    readMessages,
  });
});

module.exports = router;
