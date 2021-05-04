import { Module } from '@nestjs/common';
import { ClientsModule, Transport, } from '@nestjs/microservices';

import { ConsoleService } from './console.service';
import { CONSOLE_SVC_CLIENT } from './console.constant';

@Module({
    imports: [
        ClientsModule.register([
            { name: CONSOLE_SVC_CLIENT, transport: Transport.TCP }
        ])
    ],
    providers: [ConsoleService],
    exports: [ConsoleService]
})
export class ConsoleModule {}
