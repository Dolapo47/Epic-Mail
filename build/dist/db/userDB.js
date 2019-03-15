"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageDetails = exports.userDetails = void 0; // eslint-disable-next-line import/prefer-default-export

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
}];
exports.messageDetails = messageDetails;