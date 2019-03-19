// import joi from 'joi';
import { messageDetails } from '../db/userDB';

class messagecontroller {
  static createMessage(req, res) {
    const message = {
      id: String(messageDetails.length + 1),
      createdOn: new Date(),
      subject: req.body.subject,
      message: req.body.message,
      parentId: 1,
      status: req.body.status,
    };
    messageDetails.push(message);
    return res.status(201).json({
      status: 201,
      data: message,
      success: true,
    });
  }

  static getMessage(req, res) {
    res.status(200).json({
      status: 200,
      data: messageDetails,
      success: true,
    });
  }

  static unreadMessages(req, res) {
    const readMessages = messageDetails.filter(message => message.status === 'new');
    res.status(200).json({
      status: 200,
      data: readMessages,
      success: true,
    });
  }

  static sentMessages(req, res) {
    const readMessages = messageDetails.filter(message => message.status === 'sent');
    res.status(200).json({
      status: 200,
      data: readMessages,
      success: true,
    });
  }

  static getSingleMessage(req, res) {
    const { id } = req.params;
    const messageId = messageDetails.filter(message => message.id === id);
    if (!id) {
      res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    } else {
      res.status(200).json({
        message: 'Message successfully retrieved',
        status: 200,
        data: messageId,
        success: true,
      });
    }
  }

  static deleteMessage(req, res) {
    const { id } = req.params;
    const message = messageDetails.filter(messages => messages.id === id)[0];
    const index = messageDetails.indexOf(message);
    messageDetails.splice(index, 1);
    if (!id) {
      res.status(404).json({
        success: false,
        message: 'message not found',
      });
    } else {
      res.status(202).json({
        message: `Message ${id} deleted`,
        success: true,
      });
    }
  }
}

export default messagecontroller;
