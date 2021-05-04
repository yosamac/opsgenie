import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ServiceLogger } from '../logger/logger.service';
import { DaoService } from '../dao/dao.service';
import { MailService } from '../adapters/mail';
import { SmsService } from '../adapters/sms';
import { TimesService } from '../adapters/times';
import { DispatchedEvent } from '../common/dispatchedEvent.type';
import { EscalationPolicyService } from '../adapters/escalation-policy';
import { Pager } from '../dao/pager.schema';
import { Events } from '../common/eventTypes';

const SECONDS = 60;
const MILLISECONDS = 1000;
const FIRST_LEVEL = 0;

@Injectable()
export class PagerService {
    private ackTimeout: number;
    constructor(
        private readonly logger: ServiceLogger,
        private readonly escalationPolicySvc: EscalationPolicyService,
        private readonly smsSvc: SmsService,
        private readonly mailSvc: MailService,
        private readonly daoSvc: DaoService,
        private readonly timerSvc: TimesService,
        private readonly config: ConfigService
    ) {
        const instance = this.constructor;
        logger.setContext(instance.name);
        this.ackTimeout =
            this.config.get<number>('times.ack_timeout') * SECONDS * MILLISECONDS;
    }

    createPagerService(
        newPager: any
    ): Promise<any> {
        this.logger.info(`Creating new service for ${newPager.svcId}`);
        return this.daoSvc.create(newPager);
    }

    async handlerAlertMessage(event: DispatchedEvent){
        this.logger.info(`Handling event: ${event.eventType}`);

        const { payload } = event;
        let policyLevels = null;
        const monitoredSvc: Pager = await this.daoSvc.findOne(payload.id);

        monitoredSvc.events.push(event.eventType);
        if (monitoredSvc.state == 'UNHEALTHY') {
            await this.daoSvc.updateOne({
                svcId: monitoredSvc.svcId,
                events: monitoredSvc.events
            });
            return;
        }

        await this.escalationPolicySvc.getEPByMonitoredSvc(monitoredSvc.svcId)
            .then((ep) => {
                policyLevels = ep.policyLevels;

                return this.daoSvc.updateOne({
                    svcId: ep.svcId,
                    state: 'UNHEALTHY',
                    levelNotified: FIRST_LEVEL,
                    events: monitoredSvc.events
                });
            })
            .then((svcUpdated) => {
                const firstLevel = policyLevels[FIRST_LEVEL];
                this.notifyTargets(firstLevel);
                this.timerSvc.setTimes(this.ackTimeout);

                this.logger.info(`
                    Service updated: 
                    ${JSON.stringify(svcUpdated, null, 4)}
                `);
            })
            .catch(err => {
                this.logger.error(err);
            });
    }

    async handlerAlertAckTimeout(event: DispatchedEvent){
        this.logger.info(`Handling event: ${event.eventType}`);

        const { payload } = event;
        let policyLevels = null;

        const svc = await this.daoSvc.findOne(payload.id);
        svc.events.push(event.eventType);

        const shouldNotify = svc.events.some(item => (
            item == Events.CONSOLE.ALERT_ACK ||
            item == Events.CONSOLE.ALERT_HEALTHY
        ));

        if (shouldNotify && svc.state == 'HEALTHY') {
            svc.events = [];
            svc.levelNotified = null;
            await this.daoSvc.updateOne({
                svcId: svc.svcId,
                levelNotified: svc.levelNotified,
                events: svc.events
            });

            return;
        }

        await this.escalationPolicySvc.getEPByMonitoredSvc(svc.svcId)
            .then(ep => {
                policyLevels = ep.policyLevels;
                const nextLevel = svc.levelNotified + 1;
                const nextPolicyLevel = nextLevel == policyLevels.length
                    ? policyLevels.length
                    : policyLevels[nextLevel];

                this.notifyTargets(nextPolicyLevel);
                this.timerSvc.setTimes(this.ackTimeout);

                return this.daoSvc.updateOne({
                    svcId: ep.svcId,
                    state: 'UNHEALTHY',
                    levelNotified: nextLevel,
                    events: svc.events
                });
            })
            .catch(err => {
                this.logger.error(err);
            });
    }

    async handlerServiceHealthy(event: DispatchedEvent) {
        this.logger.info(`Handling event: ${event.eventType}`);

        const { payload } = event;

        const svc = await this.daoSvc.findOne(payload.id);
        svc.events.push(event.eventType);

        await this.daoSvc.updateOne({
            svcId: svc.svcId,
            state: 'HEALTHY',
            levelNotified: svc.levelNotified,
            events: svc.events
        })
        .catch(err => {
            this.logger.error(err);
        });
    }

    async handlerAck(event: DispatchedEvent) {
        this.logger.info(`Handling event: ${event.eventType}`);

        const { payload } = event;

        const svc = await this.daoSvc.findOne(payload.id);
        svc.events.push(event.eventType);

        await this.daoSvc.updateOne({
            svcId: svc.svcId,
            events: svc.events
        })
        .catch(err => {
            this.logger.error(err);
        });
    }

    private notifyTargets(policyLevel) {
        this.logger.info(`Sending notifications  ${policyLevel.level}`);
        policyLevel.targets.forEach(item => {
            item.type === 'EMAIL_TARGET'
                ? this.mailSvc.sendEmail(item.email)
                : this.smsSvc.sendSms(item.phoneNumber);
        });
        policyLevel.notified = true;
    }
}
