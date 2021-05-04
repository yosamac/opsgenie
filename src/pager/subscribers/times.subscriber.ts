
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { PagerService } from '../pager.service';
import { TimesAdapter } from '../../adapters/times/times.interface';
import { DispatchedEvent } from '../../common/dispatchedEvent.type';
import { Events } from '../../common/eventTypes';

@Controller()
export class TimerSubscriber implements TimesAdapter {
  constructor(private pagerService: PagerService){}

  @EventPattern(Events.TIMES.ACK_TIMEOUT)
  handlerAckTimeout(event: DispatchedEvent) {
      this.pagerService.handlerAlertAckTimeout(event);
  }
}