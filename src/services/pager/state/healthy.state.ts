import { Service } from '../pager.service';

export class HealthyState {
    private service: Service;

    constructor(service: Service) {
      this.service = service;
    }

    activate() {
      this.service.currentState = this;
    }

    
}