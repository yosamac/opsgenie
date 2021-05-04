
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { PagerService } from '../pager.service';
import { ConsoleAdapter } from '../../adapters/console/console.interface';
import { DispatchedEvent } from '../../common/dispatchedEvent.type';
import { Events } from '../../common/eventTypes';

@Controller()
export class ConsoleSubscriber implements ConsoleAdapter {

    constructor(private pagerService: PagerService) {}

    @EventPattern(Events.CONSOLE.ALERT_HEALTHY)
    handlerServiceHealthy(event: DispatchedEvent) {
        this.pagerService.handlerServiceHealthy(event);
    }

    @EventPattern(Events.CONSOLE.ALERT_ACK)
    handlerAck(event: DispatchedEvent) {
        this.pagerService.handlerAck(event);
    }
}