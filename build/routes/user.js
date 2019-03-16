"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // eslint-disable-next-line consistent-return


router.post('/signup', _user.default.createSignUp);
router.post('/signin', _user.default.createSignIn);
router.get('/', _user.default.welcome);
var _default = router;
exports.default = _default;