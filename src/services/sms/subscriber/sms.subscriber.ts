
import {EventSubscriber, On} from "event-dispatch";

import { SmsAdapter } from '../../pager/pager.adapters';
import { DispatchedEvent } from '../../../common';
import { Events } from '../../../common'

@EventSubscriber()
export class SmsSubscriber implements SmsAdapter {

    @On(Events.SMS.SMS_TARGET)
    handlerMessage(event: DispatchedEvent) {
        console.log(`
            [${this.constructor.name}]: 
            Event: ${event.eventType} 
            Payload: ${event.payload}
        `);
    }
}