"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userDB = require("../db/userDB");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var messagecontroller =
/*#__PURE__*/
function () {
  function messagecontroller() {
    _classCallCheck(this, messagecontroller);
  }

  _createClass(messagecontroller, null, [{
    key: "createMessage",
    value: function createMessage(req, res) {
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
    }
  }, {
    key: "getMessage",
    value: function getMessage(req, res) {
      res.status(200).json({
        status: 200,
        data: _userDB.messageDetails,
        success: true
      });
    }
  }, {
    key: "unreadMessages",
    value: function unreadMessages(req, res) {
      var readMessages = _userDB.messageDetails.filter(function (message) {
        return message.status === 'new';
      });

      res.status(200).json({
        status: 200,
        data: readMessages,
        success: true
      });
    }
  }, {
    key: "sentMessages",
    value: function sentMessages(req, res) {
      var readMessages = _userDB.messageDetails.filter(function (message) {
        return message.status === 'sent';
      });

      res.status(200).json({
        status: 200,
        data: readMessages,
        success: true
      });
    }
  }, {
    key: "getSingleMessage",
    value: function getSingleMessage(req, res) {
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
    }
  }, {
    key: "deleteMessage",
    value: function deleteMessage(req, res) {
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
    }
  }]);

  return messagecontroller;
}();

var _default = messagecontroller;
exports.default = _default;