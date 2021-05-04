import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { SMS_SVC_CLIENT } from './sms.constant';

@Injectable()
export class SmsService {
    constructor(
        @Inject(SMS_SVC_CLIENT)
        private readonly client: ClientProxy
    ) {}

    sendSms(data: any) {
        this.client.emit<any>('send_sms', data);
    }
}
