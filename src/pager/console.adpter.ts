
import { PagerService } from './service';


export class ConsoleAdapter {
    constructor(private readonly pagerService: PagerService) {}

    async handlerAlert(data: any) {
        this.pagerService.useCaseOne(data);
    }
}




