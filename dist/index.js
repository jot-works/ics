"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEvent = createEvent;
exports.createTodo = createTodo;

var _pipeline = require("./pipeline");

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function assignUniqueId(item) {
  item.uid = item.uid || (0, _v["default"])();
  return item;
}

function validateAndBuildEvent(event) {
  return (0, _pipeline.validateEvent)((0, _pipeline.buildItem)(event));
}

function validateAndBuildTodo(todo) {
  return (0, _pipeline.validateTodo)((0, _pipeline.buildItem)(todo));
}

function createEvent(attributes, cb) {
  if (!attributes) {
    Error('Attributes argument is required');
  }

  assignUniqueId(attributes);

  if (!cb) {
    // No callback, so return error or value in an object
    var _validateAndBuildEven = validateAndBuildEvent(attributes),
        _error = _validateAndBuildEven.error,
        _value = _validateAndBuildEven.value;

    if (_error) return {
      error: _error,
      value: _value
    };
    var event = '';

    try {
      event = (0, _pipeline.formatEvent)(_value);
    } catch (error) {
      return {
        error: error,
        value: null
      };
    }

    return {
      error: null,
      value: event
    };
  } // Return a node-style callback


  var _validateAndBuildEven2 = validateAndBuildEvent(attributes),
      error = _validateAndBuildEven2.error,
      value = _validateAndBuildEven2.value;

  if (error) return cb(error);
  return cb(null, (0, _pipeline.formatEvent)(value));
}

function createTodo(attributes, cb) {
  if (!attributes) {
    Error('Attributes argument is required');
  }

  assignUniqueId(attributes);

  if (!cb) {
    // No callback, so return error or value in an object
    var _validateAndBuildTodo = validateAndBuildTodo(attributes),
        _error2 = _validateAndBuildTodo.error,
        _value2 = _validateAndBuildTodo.value;

    if (_error2) return {
      error: _error2,
      value: _value2
    };
    var todo = '';

    try {
      todo = (0, _pipeline.formatTodo)(_value2);
    } catch (error) {
      return {
        error: error,
        value: null
      };
    }

    return {
      error: null,
      value: todo
    };
  } // Return a node-style callback


  var _validateAndBuildTodo2 = validateAndBuildTodo(attributes),
      error = _validateAndBuildTodo2.error,
      value = _validateAndBuildTodo2.value;

  if (error) return cb(error);
  return cb(null, (0, _pipeline.formatTodo)(value));
}