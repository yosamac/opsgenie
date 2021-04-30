import { EventDispatcher } from 'event-dispatch';

export type DispatchedEvent = {
	eventType:string;
	eventTime?:number;
	payload:any;
  options?: any;
}

export class EventPublisher {
    private eventDispatcher: EventDispatcher;

    constructor() {}

    public publishEvent(eventData: DispatchedEvent): void {

      const {eventType, payload, options = undefined } = eventData;
      console.debug(`[PublishEvent]:${eventType}`);

        // Dispatches event
        this.eventDispatcher.dispatch(eventType, {
            eventType: eventType,
            eventTime: Date.now(),
            payload: payload,
            options: options
        });
    }
}

export const Events = {
    CONSOLE:{
      MONITORED_SERVICE_HEALTHY: 'MONITORED_SERVICE_HEALTHY',
    },
    TIMES: {
      ACKNOWLEDGEMENT_TIMEOUT: 'ACKNOWLEDGEMENT_TIMEOUT'
    },
    ALERT: {
      ALERT_MESSAGE: 'ALERT_MESSAGE',
      MONITORED_SERVICE: 'MONITORED_SERVICE'
    },
    MAIL:{
      EMAIL_TARGET: 'EMAIL_TARGET'
    },
    SMS:{
      SMS_TARGET: 'SMS_TARGET'
    }
};




