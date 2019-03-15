"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _userDB = require("../db/userDB");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // eslint-disable-next-line consistent-return


router.post('/signup', function (req, res) {
  var hashedPassword = _bcryptjs.default.hashSync(req.body.password, 8);

  if (!req.body.email) {
    return res.status(400).json({
      success: false,
      message: 'title required'
    });
  }

  if (!req.body.firstName) {
    return res.status(400).json({
      success: false,
      message: 'First Name required'
    });
  }

  if (!req.body.lastName) {
    return res.status(400).json({
      success: false,
      message: 'Last name required'
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      success: false,
      message: 'password required'
    });
  }

  var user = {
    id: _userDB.userDetails.length + 1,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
    isAdmin: req.body.isAdmin
  };

  _userDB.userDetails.push(user);

  var token = _jsonwebtoken.default.sign({
    id: user.id
  }, 'dolapo', {
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
router.post('/signin', function (req, res) {
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
      }, 'dolapo', {
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
});
var _default = router;
exports.default = _default;