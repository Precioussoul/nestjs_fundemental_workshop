import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class EventEntity extends Document {
  @Prop({ index: true })
  name: string;

  @Prop()
  description: string;

  @Prop(SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const EventEntitySchema = SchemaFactory.createForClass(EventEntity);
EventEntitySchema.index({ name: 1, description: -1 });
