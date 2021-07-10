import { formatDate } from './utils'
import uuidv1 from 'uuid/v1'

export const eventDefaults = {
  summary: 'Untitled event',
  productId: 'adamgibbons/ics',
  method: 'PUBLISH',
  uid: uuidv1(),
  timestamp: formatDate(null, 'utc'),
  start: formatDate(null, 'utc')
}

export const todoDefaults = {
  summary: 'Untitled to-do',
  productId: 'adamgibbons/ics',
  method: 'PUBLISH',
  uid: uuidv1(),
  timestamp: formatDate(null, 'utc')
}
