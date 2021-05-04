import { DispatchedEvent } from '../../common/dispatchedEvent.type';

export interface ConsoleAdapter {
  handlerServiceHealthy(data: DispatchedEvent);
  handlerAck(data: DispatchedEvent);
}