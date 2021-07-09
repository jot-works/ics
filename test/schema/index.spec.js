import { expect } from 'chai'
import { validateEvent, validateTodo } from '../../src/schema'

describe('.validateEvent', () => {
  describe('must have one and only one occurrence of', () => {
    it('uid', () => {
      const {error} = validateEvent({summary: 'foo'})
      expect(error.errors.some(p => p === 'uid is a required field')).to.be.true
    })

    it('start', () => {
      const {error} = validateEvent({summary: 'foo', uid: 'foo'})
      expect(error.errors.some(p => p === 'start is a required field')).to.be.true
    })
  })

  describe('must have duration XOR end', () => {
    it('duration and end are not allowed together', () => {
      const {error, value} = validateEvent({
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        duration: {hours: 1},
        end: [2018, 12, 1, 11, 45]
      })
      expect(error).to.exist
    })
  })

  describe('may have one and only one occurrence of', () => {
    it('summary', () => {
      const {errors} = validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        summary: 1
      }).error

      expect(errors.some(p => p.match(/summary must be a `string` type/))).to.be.true

      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        summary: 'be concise'
      }).value.summary).to.exist
    })

    it('description', () => {
      const {errors} = validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        description: 1
      }).error
      expect(errors.some(p => p.match(/description must be a `string` type/))).to.be.true

      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        description: 'abc'
      }).value.description).to.exist

    })
    it('url', () => {
      const {errors} = validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        url: 'abc'
      }).error
      expect(errors.some(p => p.match(/url must/))).to.be.true
      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        url: 'http://github.com'
      }).value.url).to.exist
    })

    it('geo', () => {
      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        geo: 'abc'
      }).error.name === 'ValidationError')

      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        geo: {lat: 'thing', lon: 32.1},
      }).error.name === 'ValidationError')

      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        geo: {lat: 13.23, lon: 32.1},
      }).value.geo).to.exist
    })
    it('location', () => {
      const {errors} = validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        location: 1
      }).error
      expect(errors.some(p => p.match(/location must be a `string` type/))).to.be.true

      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        location: 'abc'
      }).value.location).to.exist
    })

    it('status', () => {
      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'tentativo'
      }).error).to.exist
      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'tentative'
      }).value.status).to.equal('tentative')
      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'cancelled'
      }).value.status).to.equal('cancelled')
      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'confirmed'
      }).value.status).to.equal('confirmed')
    })

    it('categories', () => {
      const {errors} = validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        categories: [1]
      }).error

      expect(errors.some(p => p.match(/categories\[0] must be a `string` type/))).to.be.true

      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        categories: ['foo', 'bar']
      }).value.categories).to.include('foo', 'bar')
    })

    it('organizer', () => {
      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        organizer: {name: 'Adam', email: 'adam@example.com'}
      }).value.organizer).to.include({name: 'Adam', email: 'adam@example.com'})

      const {errors} = validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        organizer: {foo: 'Adam'}
      }).error
      expect(errors.some(p => p === 'organizer field has unspecified keys: foo')).to.be.true
    })

    it('attendees', () => {
      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        attendees: [
          {name: 'Adam', email: 'adam@example.com'},
          {name: 'Brittany', email: 'brittany@example.com'}]
      }).value.attendees).to.be.an('array').that.is.not.empty

      const {errors} = validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        attendees: [
          {foo: 'Adam', email: 'adam@example.com'},
          {name: 'Brittany', email: 'brittany@example.com'}]
      }).error
      expect(errors.some(p => p === 'attendees[0] field has unspecified keys: foo')).to.be.true

      const res = validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        end: [2018, 12, 1, 11, 0],
        attendees: [
          {name: 'toto', email: 'toto@toto.fr', role: 'REQ-PARTICIPANT', partstat: 'ACCEPTED'}
        ]
      }).error
      expect(res).to.be.null
    })

    it('created', () => {
      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        created: [2018, 12, 1, 9, 30]
      }).value.created).to.exist
    })

    it('lastModified', () => {
      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        lastModified: [2018, 12, 1, 9, 30]
      }).value.lastModified).to.exist
    })

    it('calName', () => {
      expect(validateEvent({
        summary: 'foo',
        uid: 'foo',
        calName: 'John\'s Calendar',
        start: [2018, 12, 1, 10, 30],
      }).value.calName).to.exist
    })
  })

  describe('may have one or more occurrences of', () => {
    it('alarm component', () => {
      const event = validateEvent({
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        duration: {hours: 1},
        alarms: [{
          action: 'audio',
          trigger: []
        }]
      })

      expect(event.error).to.be.null
      expect(event.value.alarms).to.be.an('array')
      expect(event.value.alarms[0]).to.have.all.keys('action', 'trigger')
    })
  })
})
describe('.validateTodo', () => {
  describe('must have one and only one occurrence of', () => {
    it('uid', () => {
      const {error} = validateTodo({summary: 'foo'})
      expect(error.errors.some(p => p === 'uid is a required field')).to.be.true
    })

    it('start', () => {
      const {error} = validateTodo({summary: 'foo', uid: 'foo'})
      expect(error.errors.some(p => p === 'start is a required field')).to.be.true
    })
  })

  describe('must have duration XOR due', () => {
    it('duration and due are not allowed together', () => {
      const {error, value} = validateTodo({
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        duration: {hours: 1},
        due: [2018, 12, 1, 11, 45]
      })
      expect(error).to.exist
    })
  })

  describe('may have one and only one occurrence of', () => {
    it('summary', () => {
      const {errors} = validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        summary: 1
      }).error

      expect(errors.some(p => p.match(/summary must be a `string` type/))).to.be.true

      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        summary: 'be concise'
      }).value.summary).to.exist
    })

    it('description', () => {
      const {errors} = validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        description: 1
      }).error
      expect(errors.some(p => p.match(/description must be a `string` type/))).to.be.true

      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        description: 'abc'
      }).value.description).to.exist

    })
    it('url', () => {
      const {errors} = validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        url: 'abc'
      }).error
      expect(errors.some(p => p.match(/url must/))).to.be.true
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        url: 'http://github.com'
      }).value.url).to.exist
    })

    it('geo', () => {
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        geo: 'abc'
      }).error.name === 'ValidationError')

      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        geo: {lat: 'thing', lon: 32.1},
      }).error.name === 'ValidationError')

      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        geo: {lat: 13.23, lon: 32.1},
      }).value.geo).to.exist
    })
    it('location', () => {
      const {errors} = validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        location: 1
      }).error
      expect(errors.some(p => p.match(/location must be a `string` type/))).to.be.true

      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        location: 'abc'
      }).value.location).to.exist
    })

    it('status', () => {
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'tentativo'
      }).error).to.exist
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'needs-action'
      }).value.status).to.equal('needs-action')
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'completed'
      }).value.status).to.equal('completed')
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'canceled'
      }).value.status).to.equal('canceled')
    })

    it('categories', () => {
      const {errors} = validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        categories: [1]
      }).error

      expect(errors.some(p => p.match(/categories\[0] must be a `string` type/))).to.be.true

      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        categories: ['foo', 'bar']
      }).value.categories).to.include('foo', 'bar')
    })

    it('organizer', () => {
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        organizer: {name: 'Adam', email: 'adam@example.com'}
      }).value.organizer).to.include({name: 'Adam', email: 'adam@example.com'})

      const {errors} = validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        organizer: {foo: 'Adam'}
      }).error
      expect(errors.some(p => p === 'organizer field has unspecified keys: foo')).to.be.true
    })

    it('priority', () => {
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        priority: 0
      }).value.priority).to.equal(0)

      const {errors} = validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        priority: 10
      }).error
      expect(errors.some(p => p === 'priority must be less than or equal to 9')).to.be.true
    })
    it('percent', () => {
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        percent: 50
      }).value.percent).to.equal(50)

      const {errors} = validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        percent: 110
      }).error
      expect(errors.some(p => p === 'percent must be less than or equal to 100')).to.be.true
    })

    it('attendees', () => {
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        attendees: [
          {name: 'Adam', email: 'adam@example.com'},
          {name: 'Brittany', email: 'brittany@example.com'}]
      }).value.attendees).to.be.an('array').that.is.not.empty

      const {errors} = validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        attendees: [
          {foo: 'Adam', email: 'adam@example.com'},
          {name: 'Brittany', email: 'brittany@example.com'}]
      }).error
      expect(errors.some(p => p === 'attendees[0] field has unspecified keys: foo')).to.be.true

      const res = validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        due: [2018, 12, 1, 11, 0],
        attendees: [
          {name: 'toto', email: 'toto@toto.fr', role: 'REQ-PARTICIPANT', partstat: 'ACCEPTED'}
        ]
      }).error
      expect(res).to.be.null
    })

    it('created', () => {
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        created: [2018, 12, 1, 9, 30]
      }).value.created).to.exist
    })

    it('lastModified', () => {
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        lastModified: [2018, 12, 1, 9, 30]
      }).value.lastModified).to.exist
    })

    it('calName', () => {
      expect(validateTodo({
        summary: 'foo',
        uid: 'foo',
        calName: 'John\'s Calendar',
        start: [2018, 12, 1, 10, 30],
      }).value.calName).to.exist
    })
  })

  describe('may have one or more occurrences of', () => {
    it('alarm component', () => {
      const event = validateTodo({
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        duration: {hours: 1},
        alarms: [{
          action: 'audio',
          trigger: []
        }]
      })

      expect(event.error).to.be.null
      expect(event.value.alarms).to.be.an('array')
      expect(event.value.alarms[0]).to.have.all.keys('action', 'trigger')
    })
  })
})
