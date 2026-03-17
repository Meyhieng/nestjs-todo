import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReceiptDocument = Receipt & Document;

@Schema({ timestamps: true })
export class Receipt {
  @Prop({ required: true })
  issuedAt: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;
}

export const ReceiptSchema = SchemaFactory.createForClass(Receipt);