import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pager, PagerDocument } from './pager.schema';

@Injectable()
export class DaoService {
    constructor(
        @InjectModel(Pager.name)
        private readonly model: Model<PagerDocument>,
    ) {}

    create(data: Pager): Promise<Pager> {
        const createdPager = new this.model(data);
        return createdPager.save();
    }

    findAll(): Promise<Pager[]> {
        return this.model.find().exec();
    }

    findOne(id:string): Promise<Pager> {
        return this.model.findOne({ svcId: id }).exec();
    }
    updateOne(data: Partial<Pager>): Promise<any>{
        return this.model.updateOne(
            { svcId: data.svcId },
            { ...data }
        ).exec();
    }
}