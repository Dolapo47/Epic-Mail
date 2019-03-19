"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupDetails = exports.messageDetails = exports.userDetails = void 0;
var userDetails = [{
  id: 1,
  email: 'Dolapo@epicmail.com',
  firstName: 'Dolapo',
  lastName: 'Adeleye',
  password: 'dolapo',
  isAdmin: 'true'
}];
exports.userDetails = userDetails;
var messageDetails = [{
  id: '1',
  createdOn: new Date(),
  subject: 'Epic mail app',
  message: 'this is Epic mail app for andela',
  parentMessageId: '1',
  status: 'sent'
}, {
  id: '1',
  createdOn: new Date(),
  subject: 'Epic mail app',
  message: 'this is Epic mail app for andela',
  parentMessageId: '1',
  status: 'sent'
}];
exports.messageDetails = messageDetails;
var groupDetails = [{
  id: '1',
  name: 'Epic group',
  role: 'admin'
}];
exports.groupDetails = groupDetails;