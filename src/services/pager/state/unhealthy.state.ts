import { PagerService, Service } from '../pager.service';
import { State } from './state';


export class UnhealthyState implements State {

    private service: Service;

    constructor(service: Service) {
      this.service = service;
    }

    activate() {
      this.service.currentState = this;
    }
}