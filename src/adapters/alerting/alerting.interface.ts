import { DispatchedEvent } from '../../common/dispatchedEvent.type';

export interface AlertAdapter {
  handlerAlertMessage(data: DispatchedEvent);
}