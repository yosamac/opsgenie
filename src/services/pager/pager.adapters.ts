import { PolicyLevel } from './policyLevel/abstract.policy.level';
import { DispatchedEvent } from '../../common';
import { HealthyState, UnhealthyState, State } from './state';

export type Policy = {
    svcId: string,
    types: {
        email: string,
        sms: string,
    },
    level: PolicyLevel
}

export interface EPAdapter {
    setPolicyLevel(policyLevel: PolicyLevel): void
    getPolicyLevel(): PolicyLevel;
    setPolicy(policy: Policy): void;
    getPolicy(): Policy;
}

export interface MailAdapter {
    handlerMessage(data: DispatchedEvent): void
}

export interface SmsAdapter {
    handlerMessage(data: DispatchedEvent): void
}

export interface PersistenceAdapter {
    findOne(id: string): any;
    findAll(): any;
    save(data: any)
}

export interface TimesAdapter {
    setTimes?(time: any): void
    handlerAckTimeout(data: DispatchedEvent)
}

export interface AlertAdapter {
    handlerAlertMessage(data: DispatchedEvent);
    handlerMonitoredService(data:DispatchedEvent);
}

export interface ConsoleAdapter {
    handlerMonitoredServiceHealthy(data: DispatchedEvent);
    handlerServiceHealthy(data: DispatchedEvent);
    handlerAlertAcknowledgment(data: DispatchedEvent);
}