"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoDefaults = exports.eventDefaults = void 0;

var _utils = require("./utils");

var _v = _interopRequireDefault(require("uuid/v1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var eventDefaults = {
  summary: 'Untitled event',
  productId: 'adamgibbons/ics',
  method: 'PUBLISH',
  uid: (0, _v["default"])(),
  timestamp: (0, _utils.formatDate)(null, 'utc'),
  start: (0, _utils.formatDate)(null, 'utc')
};
exports.eventDefaults = eventDefaults;
var todoDefaults = {
  summary: 'Untitled to-do',
  productId: 'adamgibbons/ics',
  method: 'PUBLISH',
  uid: (0, _v["default"])(),
  timestamp: (0, _utils.formatDate)(null, 'utc')
};
exports.todoDefaults = todoDefaults;