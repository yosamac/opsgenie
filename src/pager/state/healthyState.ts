import { PagerService } from '../service'

export class HealthyState {
    private pagerService: PagerService;

    constructor(pagerSvc: PagerService) {
      this.pagerService = pagerSvc;
    }

    
}