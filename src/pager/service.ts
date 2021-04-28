
import { HealthyState } from './state/healthyState';
import { UnhealthyState } from './state/unhealthyState';
import { PolicyLevel } from './policyLevel/policyLevel';
import { EventEmitter } from 'events';

import {
    MailService,
    SmsService,
    PersistenceService,
    TimesService,
    EPService
} from './adapters';

export type Pager = {
    id: string,
    state: {
        healthy: HealthyState,
        unhealthy: UnhealthyState,
    },
    types: {
        email: string,
        sms: string,
    },
    level: PolicyLevel
}

export class PagerService {
    
    private pager:Pager;
    constructor(
        private readonly epSvc: EPService,
        private readonly daoSvc: PersistenceService,
        private readonly mailSvc: MailService,
        private readonly smsSvc: SmsService,
        private readonly timerSvc: TimesService,
        private readonly publisher: EventEmitter
    ) {}

    getMonitoredService(data) {
        console.info(`Getting monitored service data for: ${data.id}`);
        return this.daoSvc.findOne(data.id);
    }

    changeState(){}

    notifyAll(pager: Pager) {
        
        this.publisher.emit('all_targets', { pager });
    }

    /* 
    Use case 1:
    Given a Monitored Service in a Healthy State,
    when the Pager receives an Alert related to this Monitored Service,
    then the Monitored Service becomes Unhealthy,
    the Pager notifies all targets of the first level of the escalation policy,
    and sets a 15-minutes acknowledgement delay
    */

    useCaseOne(pager: Pager) {

        pager.level.nextLevel();
        this.notifyAll(pager);
    }

}
