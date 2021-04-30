import { Service } from 'typedi';
import { Level, PolicyLevel } from './policyLevel/abstract.policy.level';

import { State } from './state';
import { EventPublisher } from '../../common';
import {
    PersistenceAdapter,
    EPAdapter,
    Policy
} from './pager.adapters';

export type Service = {
    id: string;
    states: State;
    currentState: State;
}

export type Pager = {
    id: string,
    services:Service[]
}

@Service()
export class PagerService {
    pager: Pager;
    
    constructor(
        private readonly daoSvc: PersistenceAdapter,
        private readonly epSvc: EPAdapter,
        private readonly publisher: EventPublisher
    ) {}

    getMonitoredService(data) {
        console.info(`Getting monitored service data for: ${data.id}`);
        return this.daoSvc.findOne(data.id);
    }

    changeState(state: any) {
        console.log(`Activating state: ${state}`);
        // this.policy.currentState = this.policy.states[state];
        //this.policy.currentState.activate();
    }

    handlerMonitoredService(payload: any) {

    }

    handlerAlertMessage(payload: any){

    }

    handlerMonitoredServiceHealthy(payload: any) {

    }

}
