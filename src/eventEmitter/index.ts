import ee from 'event-emitter'

// Subscribers
import { levelSubscriber } from './subscribers/levelSubscriber'

const eventEmitter = ee(class {})

levelSubscriber(eventEmitter)
export default eventEmitter