import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { EP_SVC_CLIENT } from './ep.constant';
import { PolicyLevel } from './policyLevel/abstract.policy.level';
import { ep } from '../../../test/mock/constants';

@Injectable()
export class EscalationPolicyService {
    constructor(
        @Inject(EP_SVC_CLIENT)
        private readonly client: ClientProxy
    ) {}

    getEPByMonitoredSvc(data: any): Promise<any> {
        const result = ep.find(item => data == item.svcId);
        if (!result){
            return Promise.reject(new Error('Service not found'));
        }
        return Promise.resolve(result);
        // return this.client.send<any>(
        //     { cmd: 'get_monitored_service' },
        //     data
        // ).toPromise();
    }

    setPolicyLevel(data: PolicyLevel): void{
        this.client.send<any>(
            { cmd: 'set_Policy_level' },
            data
        );
    }
}
