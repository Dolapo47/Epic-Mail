"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("joi"));

var _userDB = require("../db/userDB");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();

var usercontroller =
/*#__PURE__*/
function () {
  function usercontroller() {
    _classCallCheck(this, usercontroller);
  }

  _createClass(usercontroller, null, [{
    key: "signUp",
    value: function signUp(req, res) {
      var hashedPassword = _bcryptjs.default.hashSync(req.body.password, 8);

      var user = {
        id: _userDB.userDetails.length + 1,
        email: req.body.email.trim(),
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        password: hashedPassword,
        isAdmin: req.body.isAdmin
      };

      var schema = _joi.default.object().keys({
        email: _joi.default.string().email().required(),
        password: _joi.default.string().min(5).max(10).required(),
        firstName: _joi.default.string().max(20).required(),
        lastName: _joi.default.string().max(20).required(),
        isAdmin: _joi.default.boolean().required()
      });

      _joi.default.validate(req.body, schema, function (err, result) {
        if (err) {
          res.send('error in user input');
        }

        _userDB.userDetails.push(user);

        var token = _jsonwebtoken.default.sign({
          id: user.id
        }, process.env.SECRET, {
          expiresIn: 86400
        });

        res.status(201).json({
          status: 201,
          data: [user, {
            auth: true,
            token: token
          }],
          success: true
        });
      });
    }
  }, {
    key: "signIn",
    value: function signIn(req, res) {
      _userDB.userDetails.map(function (user) {
        if (user.email === req.body.email) {
          var passwordIsValid = _bcryptjs.default.compareSync(req.body.password, user.password);

          if (!passwordIsValid) {
            return res.status(401).json({
              auth: false,
              token: null
            });
          }

          var token = _jsonwebtoken.default.sign({
            email: user.email
          }, process.env.SECRET, {
            expiresIn: 86400
          });

          res.status(200).json({
            auth: true,
            token: token,
            success: true
          });
        }

        return user;
      });
    }
  }, {
    key: "welcome",
    value: function welcome(req, res) {
      res.status(200).json({
        message: 'Welcome to Epic Mail',
        success: true
      });
    }
  }]);

  return usercontroller;
}();

var _default = usercontroller;
exports.default = _default;