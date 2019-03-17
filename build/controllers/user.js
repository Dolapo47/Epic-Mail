"use strict";

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("joi"));

var _userDB = require("../db/userDB");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config(); // eslint-disable-next-line consistent-return


exports.createSignUp = function (req, res) {
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
};

exports.createSignIn = function (req, res) {
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
};

exports.welcome = function (req, res) {
  res.status(200).json({
    message: 'Welcome to Epic Mail',
    success: true
  });
};