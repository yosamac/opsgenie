import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PagerDocument = Pager & Document;

@Schema({ timestamps: true, versionKey: false })
export class Pager {
  @Prop()
  svcId: string;
  @Prop({ enum: ['HEALTHY', 'UNHEALTHY'] })
  state: string;
  @Prop([String])
  events: string[];
  @Prop({ type: Number, required: false })
  levelNotified: number;
}

export const PagerSchema = SchemaFactory.createForClass(Pager);
