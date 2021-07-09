import { expect } from 'chai'
import { buildItem } from '../../src/pipeline'

describe('pipeline.build properties', () => {
  describe('summary', () => {
    it('sets a default', () => {
      const event = buildItem()
      expect(event.summary).to.equal('Untitled')
    })
    it('sets a summary', () => {
      const event = buildItem({ summary: 'Hello event!' })
      expect(event.summary).to.equal('Hello event!')
    })
  })
  describe('productId', () => {
    it('sets a default', () => {
      const event = buildItem()
      expect(event.productId).to.equal('adamgibbons/ics')
    })
    it('sets a product id', () => {
      const event = buildItem({ productId: 'myProductId' })
      expect(event.productId).to.equal('myProductId')
    })
  })
  describe('method', () => {
    it('sets a default', () => {
      const event = buildItem()
      expect(event.method).to.equal('PUBLISH')
    })
    it('sets a method', () => {
      const event = buildItem({ method: 'REQUEST' })
      expect(event.method).to.equal('REQUEST')
    })
  })
  describe('uid', () => {
    it('sets a default', () => {
      const event = buildItem()
      expect(event.uid).to.exist
    })
    it('sets a product id', () => {
      const event = buildItem({ uid: 'myuid' })
      expect(event.uid).to.equal('myuid')
    })
  })
  describe('sequence', () => {
    it('sets a sequence number', () => {
      const event = buildItem({ sequence: 5 })
      expect(event.sequence).to.equal(5)
    })
  })
  describe('start and end', () => {
    it('defaults to UTC date-time format', () => {
      const event = buildItem({
        start: [2017, 1, 19, 1, 30],
        end: [2017, 1, 19, 12, 0]
      })
      expect(event.start).to.be.an('array')
      expect(event.end).to.be.an('array')
    })
  })
  describe('end', () => {
    it('defaults to UTC date-time format', () => {
      const event = buildItem({ start: [2017, 1, 19, 1, 30] })
      expect(event.start).to.be.an('array')
    })
  })
  describe('created', () => {
    it('sets a created timestamp', () => {
      const event = buildItem({ created: [2017, 1, 19, 1, 30] })
      console.log(event)
      expect(event.created).to.be.an('array')
    })
  })
  describe('lastModified', () => {
    it('sets a last last modified timestamp', () => {
      const event = buildItem({ lastModified: [2017, 1, 19, 1, 30] })
      expect(event.lastModified).to.be.an('array')
    })
  })
  describe('calName', () => {
    it('sets a cal name', () => {
      const event = buildItem({ calName: 'John\'s Calendar' })
      expect(event.calName).to.equal('John\'s Calendar')
    })
  })
  describe('description', () => {
    it('removes a falsey value', () => {
      const event = buildItem()
      expect(event.description).not.to.exist
    })
    it('sets a description', () => {
      const event = buildItem({ description: 'feels so good' })
      expect(event.description).to.equal('feels so good')
    })
  })
  describe('url', () => {
    it('removes a falsey value', () => {
      const event = buildItem()
      expect(event.url).not.to.exist
    })
    it('sets a url', () => {
      const event = buildItem({ url: 'http://www.google.com' })
      expect(event.url).to.equal('http://www.google.com')
    })
  })
  describe('geo', () => {
    it('removes a falsey value', () => {
      const event = buildItem()
      expect(event.geo).not.to.exist
    })
    it('sets a url', () => {
      const event = buildItem({ geo: {lat: 1, lon: 2} })
      expect(event.geo).to.deep.equal({lat: 1, lon: 2})
    })
  })
  describe('location', () => {
    it('removes a falsey value', () => {
      const event = buildItem()
      expect(event.location).not.to.exist
    })
    it('sets a url', () => {
      const event = buildItem({ location: 'little boxes' })
      expect(event.location).to.equal('little boxes')
    })
  })
  describe('categories', () => {
    it('removes a falsey value', () => {
      const event = buildItem()
      expect(event.categories).not.to.exist
    })
    it('sets categories', () => {
      const event = buildItem({ categories: ['foo', 'bar', 'baz'] })
      expect(event.categories).to.include('foo', 'bar', 'baz')
    })
  })
  describe('organizer', () => {
    it('removes a falsey value', () => {
      const event = buildItem()
      expect(event.organizer).not.to.exist
    })
    it('sets an organizer', () => {
      const event = buildItem({ organizer: {
        name: 'Adam Gibbons',
        email: 'adam@example.com'
      }})
      expect(event.organizer).to.deep.equal({
        name: 'Adam Gibbons',
        email: 'adam@example.com'
      })
    })
  })
  describe('attendees', () => {
    it('removes a falsey value', () => {
      const event = buildItem()
      expect(event.attendees).not.to.exist
    })
    it('sets attendees', () => {
      const event = buildItem({ attendees: [
        { name: 'Adam Gibbons', email: 'adam@example.com' },
        { name: 'Brittany Seaton', email: 'brittany@example.com' }
      ]})
      expect(event.attendees).to.be.an('array').to.have.length(2)
    })
  })
  describe('alarms', () => {
    it('removes falsey values', () => {
      const event = buildItem()
      expect(event.alarms).not.to.exist
    })
    it('sets alarms', () => {
      const event = buildItem({
        alarms: [{
          action: 'audio',
          trigger: [1997, 3, 17, 13, 30, 0],
          repeat: 4,
          duration: {
            hours: 1
          },
          description: 'Breakfast meeting with executive\nteam.'
        }]
      })
      expect(event.alarms).to.be.an('array')
    })
  })
})