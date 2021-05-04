import { Module } from '@nestjs/common';
import { ClientsModule, Transport, } from '@nestjs/microservices';

import { AlertingService } from './alerting.service';
import { ALERTING_SVC_CLIENT } from './alerting.constant';

@Module({
    imports: [
        ClientsModule.register([
            { name: ALERTING_SVC_CLIENT, transport: Transport.TCP }
        ])
    ],
    providers: [AlertingService],
    exports: [AlertingService]
})
export class AlertingModule {}
