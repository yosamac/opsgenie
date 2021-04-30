import { EventSubscriber, On} from "event-dispatch";
import { Inject, Container } from 'typedi';

import { PagerService } from '../pager.service';
import { ConsoleAdapter } from '../pager.adapters';
import { Events } from '../../../common'
import { DispatchedEvent } from '../../../common/index'

@EventSubscriber()
export class ConsoleSubscriber implements ConsoleAdapter {

  constructor(
    @Inject()
    private pagerService: PagerService = Container.get(PagerService)
  ){}

    @On(Events.CONSOLE.MONITORED_SERVICE_HEALTHY)
    handlerMonitoredServiceHealthy(event: DispatchedEvent) {
        this.pagerService.handlerMonitoredServiceHealthy(event.payload)
    }

    @On(Events.ALERT.ALERT_MESSAGE)
    handlerAlertAcknowledgment(event: DispatchedEvent) {

    }

    @On(Events.ALERT.ALERT_MESSAGE)
    handlerServiceHealthy(event: DispatchedEvent) {

    }

}