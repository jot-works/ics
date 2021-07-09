import {
  buildItem,
  formatEvent,
  formatTodo,
  validateEvent,
  validateTodo
} from './pipeline'

import uuid from 'uuid/v4'

function assignUniqueId(item) {
  item.uid = item.uid || uuid()
  return item
}
function validateAndBuildEvent(event) {
  return validateEvent(buildItem(event))
}
function validateAndBuildTodo(todo) {
  return validateTodo(buildItem(todo))
}

export function createEvent(attributes, cb) {
  if (!attributes) { Error('Attributes argument is required') }

  assignUniqueId(attributes)

  if (!cb) {
    // No callback, so return error or value in an object
    const { error, value } = validateAndBuildEvent(attributes)

    if (error) return { error, value }

    let event = ''

    try {
      event = formatEvent(value)
    } catch (error) {
      return { error, value: null }
    }

    return { error: null, value: event }
  }

  // Return a node-style callback
  const { error, value } = validateAndBuildEvent(attributes)

  if (error) return cb(error)

  return cb(null, formatEvent(value))
}
export function createTodo(attributes, cb) {
  if (!attributes) { Error('Attributes argument is required') }

  assignUniqueId(attributes)

  if (!cb) {
    // No callback, so return error or value in an object
    const { error, value } = validateAndBuildTodo(attributes)

    if (error) return { error, value }

    let todo = ''

    try {
      todo = formatTodo(value)
    } catch (error) {
      return { error, value: null }
    }

    return { error: null, value: todo }
  }

  // Return a node-style callback
  const { error, value } = validateAndBuildTodo(attributes)

  if (error) return cb(error)

  return cb(null, formatTodo(value))
}
