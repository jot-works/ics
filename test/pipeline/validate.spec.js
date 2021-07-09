import { expect } from 'chai'
import { validateEvent, validateTodo } from '../../src/pipeline'

describe('pipeline.validateEvent', () => {
  it('validates an event', () => {
    const { error, value } = validateEvent({
      uid: '1',
      start: [1997, 10, 1, 22, 30],
      duration: { hours: 1 }
    })
    expect(error).not.to.exist
    expect(value.uid).to.equal('1')
  })
  it('returns undefined when passed no event', () => {
    const { error, value } = validateEvent()
    expect(value).to.be.undefined
  })
  it('returns an error when invalid data passed', () => {
    expect(validateEvent(null).error).to.exist
    expect(validateEvent(1).error).to.exist
    expect(validateEvent('foo').error).to.exist
    expect(validateEvent({}).error).to.exist
  })
})

describe('pipeline.validateTodo', () => {
  it('validates an todo', () => {
    const { error, value } = validateTodo({
      uid: '1',
      start: [1997, 10, 1, 22, 30],
      duration: { hours: 1 }
    })
    expect(error).not.to.exist
    expect(value.uid).to.equal('1')
  })
  it('returns undefined when passed no todo', () => {
    const { error, value } = validateTodo()
    expect(value).to.be.undefined
  })
  it('returns an error when invalid data passed', () => {
    expect(validateTodo(null).error).to.exist
    expect(validateTodo(1).error).to.exist
    expect(validateTodo('foo').error).to.exist
    expect(validateTodo({}).error).to.exist
  })
})