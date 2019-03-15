"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userDB = require("../db/userDB");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var router = _express.default.Router();

router.post('/messages', function (req, res) {
  var message = {
    id: String(_userDB.messageDetails.length + 1),
    createdOn: new Date(),
    subject: req.body.subject,
    message: req.body.message,
    parentId: 1,
    status: req.body.status
  };

  _userDB.messageDetails.push(message);

  return res.status(201).json({
    status: 201,
    data: message
  });
});
router.get('/messages', function (req, res) {
  res.status(200).json({
    status: 200,
    messages: _userDB.messageDetails
  });
});
router.get('/messages/new', function (req, res) {
  var readMessages = _userDB.messageDetails.filter(function (message) {
    return message.status === 'new';
  });

  res.status(200).json({
    status: 200,
    readMessages: readMessages
  });
});
router.get('/messages/sent', function (req, res) {
  var readMessages = _userDB.messageDetails.filter(function (message) {
    return message.status === 'sent';
  });

  res.status(200).json({
    status: 200,
    readMessages: readMessages
  });
});
router.get('/messages/:id', function (req, res) {
  var id = req.params.id;

  var messageId = _userDB.messageDetails.filter(function (message) {
    return message.id === id;
  });

  if (!id) {
    res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  } else {
    res.status(200).json({
      status: 200,
      messageId: messageId
    });
  }
});
router.delete('/messages/:id', function (req, res) {
  var id = req.params.id;

  var message = _userDB.messageDetails.filter(function (messages) {
    return messages.id === id;
  })[0];

  var index = _userDB.messageDetails.indexOf(message);

  _userDB.messageDetails.splice(index, 1);

  if (!id) {
    res.status(404).json({
      success: false,
      message: 'message not found'
    });
  } else {
    res.status(202).json({
      message: "Message ".concat(id, " deleted")
    });
  }
});
var _default = router;
exports.default = _default;