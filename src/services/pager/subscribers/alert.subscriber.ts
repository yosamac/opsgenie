
import {EventSubscriber, On} from "event-dispatch";
import Container, { Inject } from 'typedi';

import { AlertAdapter } from "../pager.adapters";
import { Events } from '../../../common'
import { DispatchedEvent } from '../../../common/index'
import { PagerService } from "../pager.service";

@EventSubscriber()
export class AlertSubscriber implements AlertAdapter {

    constructor(
        @Inject()
        private pagerService: PagerService = Container.get(PagerService)
    ){}

    @On(Events.ALERT.MONITORED_SERVICE)
    handlerMonitoredService(event: DispatchedEvent) {
        this.pagerService.handlerMonitoredService(event)
    }

    @On(Events.ALERT.ALERT_MESSAGE)
    handlerAlertMessage(event: DispatchedEvent) {
        this.pagerService.handlerAlertMessage(event.payload)
    }
}