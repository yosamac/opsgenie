import { Module } from '@nestjs/common';
import { ClientsModule, Transport, } from '@nestjs/microservices';

import { SmsService } from './sms.service';
import { SMS_SVC_CLIENT } from './sms.constant';

@Module({
    imports: [
        ClientsModule.register([
            { name: SMS_SVC_CLIENT, transport: Transport.TCP }
        ])
    ],
    providers: [SmsService],
    exports: [SmsService]
})
export class SmsModule {}
