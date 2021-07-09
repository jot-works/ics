"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = buildItem;

var _defaults = _interopRequireDefault(require("../defaults"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function buildItem() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // fill in default values where necessary
  var output = Object.assign({}, _defaults["default"], attributes); // remove falsey values

  return Object.entries(output).reduce(function (clean, entry) {
    return entry[1] ? Object.assign(clean, _defineProperty({}, entry[0], entry[1])) : clean;
  }, {});
}