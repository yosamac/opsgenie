
import {EventSubscriber, On} from "event-dispatch";

import { MailAdapter } from '../../pager/pager.adapters';
import { DispatchedEvent } from '../../../common';
import { Events } from '../../../common';

@EventSubscriber()
export class AlertSubscriber implements MailAdapter {

    @On(Events.MAIL.EMAIL_TARGET)
    handlerMessage(event: DispatchedEvent) {
        console.log(`
            [${this.constructor.name}]: 
            Event: ${event.eventType} 
            Payload: ${event.payload}
        `);
    }
}