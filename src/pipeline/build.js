import { eventDefaults, todoDefaults } from "../defaults";

export function buildEvent(attributes = {}) {
  // fill in default values where necessary
  const output = Object.assign({}, eventDefaults, attributes);

  // remove falsey values
  return Object.entries(output).reduce(
    (clean, entry) => entry[1] ? Object.assign(clean, { [entry[0]]: entry[1] }) : clean,
    {}
  )
}

export function buildTodo(attributes = {}) {
  // fill in default values where necessary
  const output = Object.assign({}, todoDefaults, attributes);

  // remove falsey values
  return Object.entries(output).reduce(
    (clean, entry) => entry[1] ? Object.assign(clean, { [entry[0]]: entry[1] }) : clean,
    {}
  )
}
