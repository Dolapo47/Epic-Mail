"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _user = _interopRequireDefault(require("./routes/user"));

var _messages = _interopRequireDefault(require("./routes/messages"));

var _group = _interopRequireDefault(require("./routes/group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
(0, _morgan.default)('dev');
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use('/api/v1', _messages.default);
app.use('/api/v1/auth', _user.default);
app.use('/api/v1', _group.default);
app.use(function (req, res, next) {
  var error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      error: 'route not found'
    }
  });
});
var _default = app;
exports.default = _default;