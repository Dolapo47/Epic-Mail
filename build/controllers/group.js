"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userDB = require("../db/userDB");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var groupController =
/*#__PURE__*/
function () {
  function groupController() {
    _classCallCheck(this, groupController);
  }

  _createClass(groupController, null, [{
    key: "createGroup",
    value: function createGroup(req, res) {
      var group = {
        id: String(_userDB.groupDetails.length + 1),
        name: req.body.name,
        role: 'user'
      };

      _userDB.groupDetails.push(group);

      res.status(201).json({
        status: 201,
        data: group,
        success: true
      });
    }
  }, {
    key: "fetchGroups",
    value: function fetchGroups(req, res) {
      res.status(200).json({
        status: 200,
        data: _userDB.groupDetails,
        success: true
      });
    }
  }, {
    key: "fetchGroup",
    value: function fetchGroup(req, res) {
      var id = req.params.id;

      var groupId = _userDB.groupDetails.filter(function (group) {
        return group.id === id;
      });

      if (!id) {
        res.status(404).json({
          success: false,
          message: 'Group not found'
        });
      } else {
        res.status(200).json({
          message: 'Group successfully retrieved',
          status: 200,
          data: groupId,
          success: true
        });
      }
    }
  }, {
    key: "deleteGroup",
    value: function deleteGroup(req, res) {
      var id = req.params.id;

      var group = _userDB.groupDetails.filter(function (groups) {
        return groups.id === id;
      })[0];

      var index = _userDB.groupDetails.indexOf(group);

      _userDB.groupDetails.splice(index, 1);

      if (!id) {
        res.status(404).json({
          success: false,
          message: 'Group not found'
        });
      } else {
        res.status(202).json({
          message: "Group ".concat(id, " deleted"),
          success: true
        });
      }
    }
  }]);

  return groupController;
}();

var _default = groupController;
exports.default = _default;