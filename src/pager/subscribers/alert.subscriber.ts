
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { PagerService } from '../pager.service';
import { AlertAdapter } from '../../adapters/alerting/alerting.interface';
import { DispatchedEvent } from '../../common/dispatchedEvent.type';
import { Events } from '../../common/eventTypes';

@Controller()
export class AlertSubscriber implements AlertAdapter {

    constructor(private readonly pagerService: PagerService) {}

    @EventPattern(Events.ALERTING.ALERT_MESSAGE)
    async handlerAlertMessage(event: DispatchedEvent) {
        this.pagerService.handlerAlertMessage(event);
    }
}