import { DispatchedEvent } from '../../common/dispatchedEvent.type';

export interface TimesAdapter {
  handlerAckTimeout(data: DispatchedEvent);
}