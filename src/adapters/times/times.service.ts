import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { TIMES_SVC_CLIENT } from './times.constant';
import { DispatchedEvent } from '../../common/dispatchedEvent.type';
import { Events } from '../../common/eventTypes';

@Injectable()
export class TimesService {
    constructor(
        @Inject(TIMES_SVC_CLIENT)
        private readonly client: ClientProxy
    ) {}

    setTimes(timeout: number) {
        this.client.emit<any>('set_timeout', timeout);
    }

    sendAckTimeout(data: DispatchedEvent) {
        this.client.emit<any>(Events.TIMES.ACK_TIMEOUT, data);
    }
}
