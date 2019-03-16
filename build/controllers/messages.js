"use strict";

var _userDB = require("../db/userDB");

exports.createNewMessage = function (req, res) {
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
    data: message,
    success: true
  });
};

exports.getMessage = function (req, res) {
  res.status(200).json({
    status: 200,
    data: _userDB.messageDetails,
    success: true
  });
};

exports.unreadMessages = function (req, res) {
  var readMessages = _userDB.messageDetails.filter(function (message) {
    return message.status === 'new';
  });

  res.status(200).json({
    status: 200,
    data: readMessages,
    success: true
  });
};

exports.sentMessages = function (req, res) {
  var readMessages = _userDB.messageDetails.filter(function (message) {
    return message.status === 'sent';
  });

  res.status(200).json({
    status: 200,
    data: readMessages,
    success: true
  });
};

exports.getSingleMessage = function (req, res) {
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
      message: 'Message successfully retrieved',
      status: 200,
      data: messageId,
      success: true
    });
  }
};

exports.deleteMessage = function (req, res) {
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
      message: "Message ".concat(id, " deleted"),
      success: true
    });
  }
};