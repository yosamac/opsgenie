import { EventSubscriber, On} from "event-dispatch";
import { Inject, Container } from 'typedi';

import { PagerService } from '../pager.service';
import { Events } from '../../../common';
import { DispatchedEvent } from '../../../common/index';
import { TimesAdapter } from "../pager.adapters";

@EventSubscriber()
export class TimerSubscriber implements TimesAdapter {
  constructor(
    @Inject() private pagerService: PagerService = Container.get(PagerService)
  ){}

  @On(Events.TIMES.ACKNOWLEDGEMENT_TIMEOUT)
  handlerAckTimeout(event: DispatchedEvent) {
    throw new Error('Method not implemented');
  }
}