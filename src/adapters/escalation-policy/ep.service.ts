import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { EP_SVC_CLIENT } from './ep.constant';
import { ep } from '../../../test/mock/constants';

@Injectable()
export class EscalationPolicyService {
    constructor(
        @Inject(EP_SVC_CLIENT)
        private readonly client: ClientProxy
    ) {}

    getEPByMonitoredSvc(data: any): Promise<any> {

        // Simulating response of Escalation Policy service
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
}
