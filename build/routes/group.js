"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _group = _interopRequireDefault(require("../controllers/group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/group', _group.default.createGroup);
router.get('/group', _group.default.fetchGroups);
router.get('/group/:id', _group.default.fetchGroup);
router.delete('/group/:id', _group.default.deleteGroup);
var _default = router;
exports.default = _default;