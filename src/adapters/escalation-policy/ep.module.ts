import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';

import { EP_SVC_CLIENT } from './ep.constant';
import { EscalationPolicyService } from './ep.service';

const EscalationPolicyProvider = {
    provide: EP_SVC_CLIENT,
    useFactory: (config: ConfigService) => {
        return ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: config.get<string>('mesh.ep.host'),
                port: config.get<number>('mesh.ep.port')
            }
        });
    },
    inject: [ConfigService]
};

@Module({
    providers: [
        EscalationPolicyService,
        EscalationPolicyProvider,
    ],
    exports: [EscalationPolicyService]
})
export class EscalationPolicyModule {}
