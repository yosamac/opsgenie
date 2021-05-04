import { Test, TestingModule } from '@nestjs/testing';
import { MainModule } from '../../src/main.module';
import {
    PagerService
} from '../../src/pager/pager.service';

import {
    DaoServiceMock,
    validSvcId,
    anotherValidSvcId
} from '../mock/dao.mock';
import {
    MailServiceMock,
    SmsServiceMock,
    EPServiceMock,
    TimesServiceMock
} from '../mock/adapters.mock';

import { TimesService } from '../../src/adapters/times';
import { SmsService } from '../../src/adapters/sms';
import { MailService } from '../../src/adapters/mail';
import { DaoService } from '../../src/dao/dao.service';
import {
    EscalationPolicyService as EPService
} from '../../src/adapters/escalation-policy';

export const envs = {
    LOGGING_LEVEL: 'NONE',
    NODE_ENV: 'development',
    TIMES_ACK_TIMEOUT: 15
};

describe('PagerService', () => {
    let pagerService: PagerService;

    beforeAll(async () => {

        process.env = Object.assign(process.env, envs);

        const app: TestingModule = await Test.createTestingModule({
            imports: [MainModule]
        })
            .overrideProvider(DaoService)
            .useClass(DaoServiceMock)
            .overrideProvider(MailService)
            .useClass(MailServiceMock)
            .overrideProvider(SmsService)
            .useClass(SmsServiceMock)
            .overrideProvider(EPService)
            .useClass(EPServiceMock)
            .overrideProvider(TimesService)
            .useClass(TimesServiceMock)
            .compile();

        pagerService = app.get<PagerService>(PagerService);

    });

    describe('#handlerAlertMessage', () => {
        const getEPByMonitoredSvcSpy = jest.spyOn(EPServiceMock.prototype, 'getEPByMonitoredSvc');
        const sendSmsSpy = jest.spyOn(SmsServiceMock.prototype, 'sendSms');
        const sendEmailSpy = jest.spyOn(MailServiceMock.prototype, 'sendEmail');
        const setTimesSpy = jest.spyOn(TimesServiceMock.prototype, 'setTimes');
        const updateOneSpy = jest.spyOn(DaoServiceMock.prototype, 'updateOne');

        const event = {
            eventType:'ALERT_MESSAGE',
            payload: { id: validSvcId },
            eventTime: Date.now(),
            options: {}
        };

        afterEach(() => {
            getEPByMonitoredSvcSpy.mockRestore();
            updateOneSpy.mockRestore();
            sendSmsSpy.mockReset();
            sendEmailSpy.mockReset();
            setTimesSpy.mockReset();
        });

    /**
       * Given a Monitored Service in a Healthy State,
       * when the Pager receives an Alert related to this Monitored Service,
       * then the Monitored Service becomes Unhealthy,
       * the Pager notifies all targets of the first level of the escalation policy,
       * and sets a 15-minutes acknowledgement delay
      */

        it('Should notify all targets of first level and set 15-minutes acknowledgement', (done) => {

            const res = pagerService.handlerAlertMessage(event);

            res.then(res => {
                expect(sendEmailSpy).toHaveBeenCalledTimes(1);
                expect(sendSmsSpy).toHaveBeenCalledTimes(2);
                expect(setTimesSpy).toHaveBeenCalledWith(
                    envs.TIMES_ACK_TIMEOUT * 60 * 1000
                );
                done();
            });
        });

        /**
         * Given a Monitored Service in an Unhealthy State,
         * the corresponding Alert is not Acknowledged
         * and the last level has not been notified,
         * when the Pager receives the Acknowledgement Timeout,
         * then the Pager notifies all targets of the next level of the escalation policy
         * and sets a 15-minutes acknowledgement delay.
        */

        it(`Should notify all targets of second level and set 15-minutes acknowledgement 
            when receives the Acknowledged timeout`, (done) => {

            const ackTimeoutEvent = {
                ...event,
                eventType:'ACK_TIMEOUT',
                payload: { id: anotherValidSvcId }
            };

            const res = pagerService.handlerAlertAckTimeout(ackTimeoutEvent);

            res.then(res => {
                expect(sendEmailSpy).toHaveBeenCalledTimes(1);
                expect(sendSmsSpy).toHaveBeenCalledTimes(2);
                expect(setTimesSpy).toHaveBeenCalledWith(
                    envs.TIMES_ACK_TIMEOUT * 60 * 1000
                );
                done();
            });
        });

        /**
         * Given a Monitored Service in an Unhealthy State
         * when the Pager receives the Acknowledgement
         * and later receives the Acknowledgement Timeout,
         * then the Pager doesn't notify any Target
         * and doesn't set an acknowledgement delay.
         */
        it('Should not notify any target and doesn\'t set an acknowledgement delay', (done) => {

            const ackEvent = {
                ...event,
                eventType:'ALERT_ACK',
            };

            const res = pagerService.handlerAck(ackEvent);
            res.then(res => {
                expect(sendSmsSpy).not.toHaveBeenCalled();
                expect(sendEmailSpy).not.toHaveBeenCalled();
                expect(setTimesSpy).not.toHaveBeenCalled();
                done();
            });
        });

        /**
         * Given a Monitored Service in an Unhealthy State,
         * when the Pager receives an Alert related to this Monitored Service,
         * then the Pager doesn’t notify any Target
         * and doesn’t set an acknowledgement delay
         */

        it(`Should not notify any target and doesn\'t set an acknowledgement delay
            when receive a Alert event`, (done) => {

            const alertEvent = {
                ...event,
                eventType:'ALERT_MESSAGE',
                payload: { id: anotherValidSvcId }
            };

            const res = pagerService.handlerAlertMessage(alertEvent);
            res.then(res => {
                expect(sendSmsSpy).not.toHaveBeenCalled();
                expect(sendEmailSpy).not.toHaveBeenCalled();
                expect(setTimesSpy).not.toHaveBeenCalled();
                done();
            });
        });

        /**
         * Given a Monitored Service in an Unhealthy State,
         * when the Pager receives a Healthy event related to this Monitored Service
         * and later receives the Acknowledgement Timeout,
         * then the Monitored Service becomes Healthy,
         * the Pager doesn’t notify any Target
         * and doesn’t set an acknowledgement delay
         */

        it(`Should not notify any target and doesn\'t set an acknowledgement delay
            when receive a Healthy event and later Acknowledgement Timeout
            `, (done) => {

            const alertEvent = {
                ...event,
                eventType:'ALERT_HEALTHY',
                payload: { id: anotherValidSvcId }
            };

            const res = pagerService.handlerServiceHealthy(alertEvent);
            res.then(res => {
                expect(sendSmsSpy).not.toHaveBeenCalled();
                expect(sendEmailSpy).not.toHaveBeenCalled();
                expect(setTimesSpy).not.toHaveBeenCalled();
                done();
            });
        });
    });
});
