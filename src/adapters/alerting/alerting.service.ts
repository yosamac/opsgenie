import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ALERTING_SVC_CLIENT } from './alerting.constant';
import { Events } from '../../common/eventTypes';
import { DispatchedEvent } from '../../common/dispatchedEvent.type';

@Injectable()
export class AlertingService {
    constructor(
        @Inject(ALERTING_SVC_CLIENT)
        private readonly client: ClientProxy
    ) {}

    sendAlertMessage(data: DispatchedEvent) {
        this.client.emit<any>(Events.ALERTING.ALERT_MESSAGE, data);
    }
}
