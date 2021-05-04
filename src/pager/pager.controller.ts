import {
    Controller, UseFilters,
    Get, Post, Body, HttpStatus,
    HttpCode, Param,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { PagerService } from './pager.service';
import { PagerIdDTO, PagerIdPipe } from './dto/request/pager.id.dto';
import { UpdateStateDto, UpdateStatePipe } from './dto/request/update.state.dto';
import {
    ServiceHttpResponse,
    HttpExceptionFilter,
} from '../common/exception.filter';

@Controller('pagers')
@ApiTags('Pager Service')
@UseFilters(HttpExceptionFilter)
export class PagerController {
    constructor(private readonly pagerService: PagerService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The monitored service state was successfully created',
        type: Object
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'The subscription wasn\'t found',
        type: ServiceHttpResponse,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal error',
        type: ServiceHttpResponse
    })
    createService(
        @Body() payload:any
    ): Promise<any> {
        return this.pagerService.createPagerService(payload);
    }

}
