import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


import { MAIL_SVC_CLIENT } from './mail.constant';

@Injectable()
export class MailService {
    constructor(
        @Inject(MAIL_SVC_CLIENT)
        private readonly client: ClientProxy
    ) {}

    sendEmail(data: any) {
        this.client.emit<any>('send_email', data);
    }
}
