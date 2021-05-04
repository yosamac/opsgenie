import { Controller, Get } from '@nestjs/common';
import { ApiTags, } from '@nestjs/swagger';

import { TimesService } from '../adapters/times/times.service';
import { ConsoleService } from '../adapters/console/console.service';
import { AlertingService } from '../adapters/alerting/alerting.service';
import { Events } from '../common/eventTypes';

@Controller('/events')
export class PagerEventController {
    constructor(
        private readonly consoleService: ConsoleService,
        private readonly alertingService: AlertingService,
        private readonly timesService: TimesService
    ) {}

    @Get('alerting')
    @ApiTags('Alerting Service')
    sendAlertMessage() {
        this.alertingService.sendAlertMessage({
            eventType: Events.ALERTING.ALERT_MESSAGE,
            eventTime: Date.now(),
            payload: { id: 'service-1' },
        });
    }

    @Get('times/ack_timeout')
    @ApiTags('Times Service')
    sendAckTimeout() {
        this.timesService.sendAckTimeout({
            eventType: Events.TIMES.ACK_TIMEOUT,
            eventTime: Date.now(),
            payload: { id: 'service-1' },
        });
    }

    @Get('console/alert_ack')
    @ApiTags('Console Service')
    sendAlertAck() {
        this.consoleService.sendAlertAck({
            eventType: Events.CONSOLE.ALERT_ACK,
            eventTime: Date.now(),
            payload: { id: 'service-1' },
        });
    }
    @Get('console/healthy')
    @ApiTags('Console Service')
    sendHealthyEvent() {
        this.consoleService.sendHealthyEvent({
            eventType: Events.CONSOLE.ALERT_HEALTHY,
            eventTime: Date.now(),
            payload: { id: 'service-1' },
        });
    }
}
