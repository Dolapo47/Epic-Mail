"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _messages = _interopRequireDefault(require("../controllers/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/messages', _messages.default.createMessage);
router.get('/messages', _messages.default.getMessage);
router.get('/messages/unread', _messages.default.unreadMessages);
router.get('/messages/sent', _messages.default.sentMessages);
router.get('/messages/:id', _messages.default.getSingleMessage);
router.delete('/messages/:id', _messages.default.deleteMessage);
var _default = router;
exports.default = _default;