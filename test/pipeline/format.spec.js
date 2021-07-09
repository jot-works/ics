import {
  buildItem,
  formatEvent,
  formatTodo
} from '../../src/pipeline'

import dayjs from 'dayjs';
import { expect } from 'chai'

describe('pipeline.formatEvent', () => {
  it('writes default values when no attributes passed', () => {
    const event = buildItem()
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('BEGIN:VCALENDAR')
    expect(formattedEvent).to.contain('VERSION:2.0')
    expect(formattedEvent).to.contain('PRODID:adamgibbons/ics')
    expect(formattedEvent).to.contain('BEGIN:VEVENT')
    expect(formattedEvent).to.contain('SUMMARY:Untitled')
    expect(formattedEvent).to.contain('UID:')
    expect(formattedEvent).to.not.contain('SEQUENCE:')
    expect(formattedEvent).to.contain('DTSTART:')
    expect(formattedEvent).to.contain('DTSTAMP:20')
    expect(formattedEvent).to.contain('END:VEVENT')
    expect(formattedEvent).to.contain('END:VCALENDAR')
  })
  it('writes a summary', () => {
    const event = buildItem({ summary: 'foo bar' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('SUMMARY:foo bar')
  })
  it('writes a start date-time', () => {
    const event = buildItem({ start: [2017, 5, 15, 10, 0] })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTSTART:2017051')
  })
  it('writes an end date-time', () => {
    const event = buildItem({ end: [2017, 5, 15, 11, 0] })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTEND:2017051')
  })
  it('writes a start date-time, taking the given date as local by default and outputting is as UTC by default', () => {
    const event = buildItem({ start: [2017, 5, 15, 10, 0] })
    const formattedEvent = formatEvent(event)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedEvent).to.contain('DTSTART:' + now + 'Z')
  })
  it('writes a start date-time, taking the given date as local by default and outputting is as UTC if requested', () => {
    const event = buildItem({ start: [2017, 5, 15, 10, 0], startOutputType: 'utc' })
    const formattedEvent = formatEvent(event)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedEvent).to.contain('DTSTART:' + now + 'Z')
  })
  it('writes a start date-time, taking the given date as local by default and outputting is as Local (floating) if requested', () => {
    const event = buildItem({ start: [2017, 5, 15, 10, 0], startOutputType: 'local' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTSTART:20170515T100000')
    expect(formattedEvent).to.not.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as local if requested and outputting is as UTC by default', () => {
    const event = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'local' })
    const formattedEvent = formatEvent(event)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedEvent).to.contain('DTSTART:' + now + 'Z')
  })
  it('writes a start date-time, taking the given date as local if requested and outputting is as UTC if requested', () => {
    const event = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'local', startOutputType: 'utc' })
    const formattedEvent = formatEvent(event)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedEvent).to.contain('DTSTART:' + now + 'Z')
  })
  it('writes a start date-time, taking the given date as local if requested and outputting is as Local (floating) if requested', () => {
    const event = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'local', startOutputType: 'local' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTSTART:20170515T100000')
    expect(formattedEvent).to.not.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as UTC if requested and outputting is as UTC by default', () => {
    const event = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'utc' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as UTC if requested and outputting is as UTC if requested', () => {
    const event = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'utc', startOutputType: 'utc' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as UTC if requested and outputting is as Local (floating) if requested', () => {
    const event = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'utc', startOutputType: 'local' })
    const formattedEvent = formatEvent(event)
    const now = dayjs(Date.UTC(2017, 5 - 1, 15, 10, 0)).format('YYYYMMDDTHHmm00')
    expect(formattedEvent).to.contain('DTSTART:' + now)
    expect(formattedEvent).to.not.contain('DTSTART:' + now + 'Z')
  })
  it('writes a created timestamp', () => {
    const event = buildItem({ created: [2017, 5, 15, 10, 0] })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('CREATED:20170515')
  })
  it('writes a lastModified timestamp', () => {
    const event = buildItem({ lastModified: [2017, 5, 15, 10, 0] })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('LAST-MODIFIED:20170515')
  })
  it('writes a cal name', () => {
    const event = buildItem({ calName: 'John\'s Calendar' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('X-WR-CALNAME:John\'s Calendar')
  })
  it('writes a sequence', () => {
    const event = buildItem({ sequence: 8 })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('SEQUENCE:8')
  })
  it('writes a description', () => {
    const event = buildItem({ description: 'bar baz' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DESCRIPTION:bar baz')
  })
  it('escapes characters in text types', () => {
    const event = buildItem({ summary: 'colon: semi; comma, period. slash\\', description: 'colon: semi; comma, period. slash\\' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DESCRIPTION:colon: semi\\; comma\\, period. slash\\\\')
    expect(formattedEvent).to.contain('SUMMARY:colon: semi\\; comma\\, period. slash\\\\')
  })
  it('folds a long description', () => {
    const event = buildItem({ description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DESCRIPTION:Lorem ipsum dolor sit amet\\, consectetur adipiscing elit\\, sed \r\n\tdo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \r\n\tminim veniam\\, quis nostrud exercitation ullamco laboris nisi ut aliquip e\r\n\tx ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptat\r\n\te velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaec\r\n\tat cupidatat non proident\\, sunt in culpa qui officia deserunt mollit anim\r\n\t id est laborum.')
  })
  it('writes a url', () => {
    const event = buildItem({ url: 'http://www.example.com/' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('URL:http://www.example.com/')
  })
  it('writes a geo', () => {
    const event = buildItem({ geo: { lat: 1.234, lon: -9.876 } })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('GEO:1.234;-9.876')
  })
  it('writes a location', () => {
    const event = buildItem({ location: 'Folsom Field, University of Colorado at Boulder' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('LOCATION:Folsom Field\\, University of Colorado at Boulder')
  })
  it('writes a status', () => {
    const event = buildItem({ status: 'tentative' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('STATUS:tentative')
  })
  it('writes categories', () => {
    const event = buildItem({ categories: ['boulder', 'running'] })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('CATEGORIES:boulder,running')
  })

  it('writes all-day events', () => {
    const eventWithOnlyStart = buildItem({ start: [2017, 5, 15] })
    const formattedStartEvent = formatEvent(eventWithOnlyStart)
    expect(formattedStartEvent).to.contain('DTSTART;VALUE=DATE:20170515')
    expect(formattedStartEvent).to.not.contain('DTEND')

    const eventWithStartAndEnd = buildItem({ start: [2017, 5, 15], end: [2017, 5, 18] })
    const formattedStartEndEvent = formatEvent(eventWithStartAndEnd)
    expect(formattedStartEndEvent).to.contain('DTSTART;VALUE=DATE:20170515')
    expect(formattedStartEndEvent).to.contain('DTEND;VALUE=DATE:20170518')
  })

  it('writes attendees', () => {
    const event = buildItem({
      attendees: [
        { name: 'Adam Gibbons', email: 'adam@example.com' },
        { name: 'Brittany Seaton', email: 'brittany@example.com', rsvp: true }
      ]
    })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('ATTENDEE;RSVP=FALSE;CN=Adam Gibbons:mailto:adam@example.com')
    expect(formattedEvent).to.contain('ATTENDEE;RSVP=TRUE;CN=Brittany Seaton:mailto:brittany@example.com')
  })
  it('writes a busystatus', () => {
    const eventFree = buildItem({ busyStatus: "FREE" })
    const eventBusy = buildItem({ busyStatus: "BUSY" })
    const eventTent = buildItem({ busyStatus: "TENTATIVE" })
    const eventOOF = buildItem({ busyStatus: "OOF" })
    const formattedEventFree = formatEvent(eventFree)
    const formattedEventBusy = formatEvent(eventBusy)
    const formattedEventTent = formatEvent(eventTent)
    const formattedEventOOF = formatEvent(eventOOF)
    expect(formattedEventFree).to.contain('X-MICROSOFT-CDO-BUSYSTATUS:FREE')
    expect(formattedEventBusy).to.contain('X-MICROSOFT-CDO-BUSYSTATUS:BUSY')
    expect(formattedEventTent).to.contain('X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE')
    expect(formattedEventOOF).to.contain('X-MICROSOFT-CDO-BUSYSTATUS:OOF')
  })
  it('writes an organizer', () => {
    const event = formatEvent({
      organizer: {
        name: 'Adam Gibbons',
        email: 'adam@example.com'
      }
    })
    const formattedEvent = formatEvent(event)
    expect(event).to.contain('ORGANIZER;CN=Adam Gibbons:mailto:adam@example.com')
  })
  it('writes an alarm', () => {
    const formattedEvent = formatEvent({
      alarms: [{
        action: 'audio',
        trigger: [1997, 2, 17, 1, 30],
        repeat: 4,
        duration: { minutes: 15 },
        attach: 'ftp://example.com/pub/sounds/bell-01.aud'
      }]
    })

    expect(formattedEvent).to.contain('BEGIN:VALARM')
    expect(formattedEvent).to.contain('TRIGGER;VALUE=DATE-TIME:199702')
    expect(formattedEvent).to.contain('REPEAT:4')
    expect(formattedEvent).to.contain('DURATION:PT15M')
    expect(formattedEvent).to.contain('ACTION:AUDIO')
    expect(formattedEvent).to.contain('ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/sounds/bell-01.aud')
    expect(formattedEvent).to.contain('END:VALARM')
  })
  it('never writes lines longer than 75 characters, excluding CRLF', () => {
    const formattedEvent = formatEvent({
      productId: '*'.repeat(1000),
      method: '*'.repeat(1000),
      summary: '*'.repeat(1000),
      description: '*'.repeat(1000),
      url: '*'.repeat(1000),
      geo: '*'.repeat(1000),
      location: '*'.repeat(1000),
      status: '*'.repeat(1000),
      categories: '*'.repeat(1000),
      organizer: '*'.repeat(1000),
      attendees: [
        { name: '*'.repeat(1000), email: '*'.repeat(1000) },
        { name: '*'.repeat(1000), email: '*'.repeat(1000), rsvp: true }
      ]
    })
    const max = Math.max(...formattedEvent.split('\r\n').map(line => line.length))
    expect(max).to.be.at.most(75)
  })
  it('writes a recurrence rule', () => {
    const formattedEvent = formatEvent({ recurrenceRule: 'FREQ=DAILY' })

    expect(formattedEvent).to.contain('RRULE:FREQ=DAILY')
  })
})

describe('pipeline.formatTodo', () => {
  it('writes default values when no attributes passed', () => {
    const todo = buildItem()
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('BEGIN:VCALENDAR')
    expect(formattedTodo).to.contain('VERSION:2.0')
    expect(formattedTodo).to.contain('PRODID:adamgibbons/ics')
    expect(formattedTodo).to.contain('BEGIN:VTODO')
    expect(formattedTodo).to.contain('SUMMARY:Untitled')
    expect(formattedTodo).to.contain('UID:')
    expect(formattedTodo).to.not.contain('SEQUENCE:')
    expect(formattedTodo).to.contain('DTSTART:')
    expect(formattedTodo).to.contain('DTSTAMP:20')
    expect(formattedTodo).to.contain('END:VTODO')
    expect(formattedTodo).to.contain('END:VCALENDAR')
  })
  it('writes a summary', () => {
    const todo = buildItem({ summary: 'foo bar' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('SUMMARY:foo bar')
  })
  it('writes a start date-time', () => {
    const todo = buildItem({ start: [2017, 5, 15, 10, 0] })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('DTSTART:2017051')
  })
  it('writes a due date-time', () => {
    const todo = buildItem({ due: [2017, 5, 15, 11, 0] })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('DUE:2017051')
  })
  it('writes a start date-time, taking the given date as local by default and outputting is as UTC by default', () => {
    const todo = buildItem({ start: [2017, 5, 15, 10, 0] })
    const formattedTodo = formatTodo(todo)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedTodo).to.contain('DTSTART:' + now + 'Z')
  })
  it('writes a start date-time, taking the given date as local by default and outputting is as UTC if requested', () => {
    const todo = buildItem({ start: [2017, 5, 15, 10, 0], startOutputType: 'utc' })
    const formattedTodo = formatTodo(todo)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedTodo).to.contain('DTSTART:' + now + 'Z')
  })
  it('writes a start date-time, taking the given date as local by default and outputting is as Local (floating) if requested', () => {
    const todo = buildItem({ start: [2017, 5, 15, 10, 0], startOutputType: 'local' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('DTSTART:20170515T100000')
    expect(formattedTodo).to.not.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as local if requested and outputting is as UTC by default', () => {
    const todo = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'local' })
    const formattedTodo = formatTodo(todo)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedTodo).to.contain('DTSTART:' + now + 'Z')
  })
  it('writes a start date-time, taking the given date as local if requested and outputting is as UTC if requested', () => {
    const todo = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'local', startOutputType: 'utc' })
    const formattedTodo = formatTodo(todo)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedTodo).to.contain('DTSTART:' + now + 'Z')
  })
  it('writes a start date-time, taking the given date as local if requested and outputting is as Local (floating) if requested', () => {
    const todo = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'local', startOutputType: 'local' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('DTSTART:20170515T100000')
    expect(formattedTodo).to.not.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as UTC if requested and outputting is as UTC by default', () => {
    const todo = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'utc' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as UTC if requested and outputting is as UTC if requested', () => {
    const todo = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'utc', startOutputType: 'utc' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as UTC if requested and outputting is as Local (floating) if requested', () => {
    const todo = buildItem({ start: [2017, 5, 15, 10, 0], startInputType: 'utc', startOutputType: 'local' })
    const formattedTodo = formatTodo(todo)
    const now = dayjs(Date.UTC(2017, 5 - 1, 15, 10, 0)).format('YYYYMMDDTHHmm00')
    expect(formattedTodo).to.contain('DTSTART:' + now)
    expect(formattedTodo).to.not.contain('DTSTART:' + now + 'Z')
  })
  it('writes a created timestamp', () => {
    const todo = buildItem({ created: [2017, 5, 15, 10, 0] })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('CREATED:20170515')
  })
  it('writes a lastModified timestamp', () => {
    const todo = buildItem({ lastModified: [2017, 5, 15, 10, 0] })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('LAST-MODIFIED:20170515')
  })
  it('writes a cal name', () => {
    const todo = buildItem({ calName: 'John\'s Calendar' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('X-WR-CALNAME:John\'s Calendar')
  })
  it('writes a sequence', () => {
    const todo = buildItem({ sequence: 8 })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('SEQUENCE:8')
  })
  it('writes a description', () => {
    const todo = buildItem({ description: 'bar baz' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('DESCRIPTION:bar baz')
  })
  it('escapes characters in text types', () => {
    const todo = buildItem({ summary: 'colon: semi; comma, period. slash\\', description: 'colon: semi; comma, period. slash\\' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('DESCRIPTION:colon: semi\\; comma\\, period. slash\\\\')
    expect(formattedTodo).to.contain('SUMMARY:colon: semi\\; comma\\, period. slash\\\\')
  })
  it('folds a long description', () => {
    const todo = buildItem({ description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('DESCRIPTION:Lorem ipsum dolor sit amet\\, consectetur adipiscing elit\\, sed \r\n\tdo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \r\n\tminim veniam\\, quis nostrud exercitation ullamco laboris nisi ut aliquip e\r\n\tx ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptat\r\n\te velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaec\r\n\tat cupidatat non proident\\, sunt in culpa qui officia deserunt mollit anim\r\n\t id est laborum.')
  })
  it('writes a url', () => {
    const todo = buildItem({ url: 'http://www.example.com/' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('URL:http://www.example.com/')
  })
  it('writes a geo', () => {
    const todo = buildItem({ geo: { lat: 1.234, lon: -9.876 } })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('GEO:1.234;-9.876')
  })
  it('writes a location', () => {
    const todo = buildItem({ location: 'Folsom Field, University of Colorado at Boulder' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('LOCATION:Folsom Field\\, University of Colorado at Boulder')
  })
  it('writes a status', () => {
    const todo = buildItem({ status: 'tentative' })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('STATUS:tentative')
  })
  it('writes categories', () => {
    const todo = buildItem({ categories: ['boulder', 'running'] })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('CATEGORIES:boulder,running')
  })

  it('writes all-day todos', () => {
    const todoWithOnlyStart = buildItem({ start: [2017, 5, 15] })
    const formattedStartTodo = formatTodo(todoWithOnlyStart)
    expect(formattedStartTodo).to.contain('DTSTART;VALUE=DATE:20170515')
    expect(formattedStartTodo).to.not.contain('DUE')

    const todoWithStartAndEnd = buildItem({ start: [2017, 5, 15], due: [2017, 5, 18] })
    const formattedStartEndTodo = formatTodo(todoWithStartAndEnd)
    expect(formattedStartEndTodo).to.contain('DTSTART;VALUE=DATE:20170515')
    expect(formattedStartEndTodo).to.contain('DUE;VALUE=DATE:20170518')
  })

  it('writes attendees', () => {
    const todo = buildItem({
      attendees: [
        { name: 'Adam Gibbons', email: 'adam@example.com' },
        { name: 'Brittany Seaton', email: 'brittany@example.com', rsvp: true }
      ]
    })
    const formattedTodo = formatTodo(todo)
    expect(formattedTodo).to.contain('ATTENDEE;RSVP=FALSE;CN=Adam Gibbons:mailto:adam@example.com')
    expect(formattedTodo).to.contain('ATTENDEE;RSVP=TRUE;CN=Brittany Seaton:mailto:brittany@example.com')
  })
  it('writes an organizer', () => {
    const todo = formatTodo({
      organizer: {
        name: 'Adam Gibbons',
        email: 'adam@example.com'
      }
    })
    const formattedTodo = formatTodo(todo)
    expect(todo).to.contain('ORGANIZER;CN=Adam Gibbons:mailto:adam@example.com')
  })
  it('writes an alarm', () => {
    const formattedTodo = formatTodo({
      alarms: [{
        action: 'audio',
        trigger: [1997, 2, 17, 1, 30],
        repeat: 4,
        duration: { minutes: 15 },
        attach: 'ftp://example.com/pub/sounds/bell-01.aud'
      }]
    })

    expect(formattedTodo).to.contain('BEGIN:VALARM')
    expect(formattedTodo).to.contain('TRIGGER;VALUE=DATE-TIME:199702')
    expect(formattedTodo).to.contain('REPEAT:4')
    expect(formattedTodo).to.contain('DURATION:PT15M')
    expect(formattedTodo).to.contain('ACTION:AUDIO')
    expect(formattedTodo).to.contain('ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/sounds/bell-01.aud')
    expect(formattedTodo).to.contain('END:VALARM')
  })
  it('never writes lines longer than 75 characters, excluding CRLF', () => {
    const formattedTodo = formatTodo({
      productId: '*'.repeat(1000),
      method: '*'.repeat(1000),
      summary: '*'.repeat(1000),
      description: '*'.repeat(1000),
      url: '*'.repeat(1000),
      geo: '*'.repeat(1000),
      location: '*'.repeat(1000),
      status: '*'.repeat(1000),
      categories: '*'.repeat(1000),
      organizer: '*'.repeat(1000),
      attendees: [
        { name: '*'.repeat(1000), email: '*'.repeat(1000) },
        { name: '*'.repeat(1000), email: '*'.repeat(1000), rsvp: true }
      ]
    })
    const max = Math.max(...formattedTodo.split('\r\n').map(line => line.length))
    expect(max).to.be.at.most(75)
  })
  it('writes a recurrence rule', () => {
    const formattedTodo = formatTodo({ recurrenceRule: 'FREQ=DAILY' })

    expect(formattedTodo).to.contain('RRULE:FREQ=DAILY')
  })
})
