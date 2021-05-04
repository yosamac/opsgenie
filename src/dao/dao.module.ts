import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DaoService } from './dao.service';
import { Pager, PagerSchema } from './pager.schema';

@Module({
    imports:[
        MongooseModule.forFeature([
            { name: Pager.name, schema: PagerSchema }
        ])
    ],
    providers: [DaoService],
    exports:[DaoService]
})
export class DaoModule {}