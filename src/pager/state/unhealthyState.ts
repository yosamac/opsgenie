import { PagerService } from '../service';


export class UnhealthyState {

    private pagerService: PagerService;

    constructor(pagerSvc: PagerService) {
      this.pagerService = pagerSvc;
    }
}