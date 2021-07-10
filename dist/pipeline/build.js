"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildEvent = buildEvent;
exports.buildTodo = buildTodo;

var _defaults = require("../defaults");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function buildEvent() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // fill in default values where necessary
  var output = Object.assign({}, _defaults.eventDefaults, attributes); // remove falsey values

  return Object.entries(output).reduce(function (clean, entry) {
    return entry[1] ? Object.assign(clean, _defineProperty({}, entry[0], entry[1])) : clean;
  }, {});
}

function buildTodo() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // fill in default values where necessary
  var output = Object.assign({}, _defaults.todoDefaults, attributes); // remove falsey values

  return Object.entries(output).reduce(function (clean, entry) {
    return entry[1] ? Object.assign(clean, _defineProperty({}, entry[0], entry[1])) : clean;
  }, {});
}