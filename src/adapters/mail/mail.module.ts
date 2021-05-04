import { Module } from '@nestjs/common';
import { ClientsModule, Transport, } from '@nestjs/microservices';

import { MailService } from './mail.service';
import { MAIL_SVC_CLIENT } from './mail.constant';

@Module({
    imports: [
        ClientsModule.register([
            { name: MAIL_SVC_CLIENT, transport: Transport.TCP }
        ])
    ],
    providers: [MailService],
    exports: [MailService]
})
export class MailModule {}
