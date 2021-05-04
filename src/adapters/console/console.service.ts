import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { DispatchedEvent } from '../../common/dispatchedEvent.type';
import { Events } from '../../common/eventTypes';
import { CONSOLE_SVC_CLIENT } from './console.constant';

@Injectable()
export class ConsoleService {
    constructor(
        @Inject(CONSOLE_SVC_CLIENT)
        private readonly client: ClientProxy
    ) {}

    sendAlertAck(data: DispatchedEvent) {
        this.client.emit<any>(Events.CONSOLE.ALERT_ACK, data);
    }

    sendHealthyEvent(data: DispatchedEvent) {
        this.client.emit<any>(Events.CONSOLE.ALERT_HEALTHY, data);
    }
}
