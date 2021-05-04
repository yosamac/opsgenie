import { Module } from '@nestjs/common';
import { ClientsModule, Transport, } from '@nestjs/microservices';

import { TimesService } from './times.service';
import { TIMES_SVC_CLIENT } from './times.constant';

@Module({
    imports: [
        ClientsModule.register([
            { name: TIMES_SVC_CLIENT, transport: Transport.TCP }
        ])
    ],
    providers: [TimesService],
    exports: [TimesService]
})
export class TimesModule {}
