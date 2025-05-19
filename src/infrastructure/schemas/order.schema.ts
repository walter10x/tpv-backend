import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; // Importa Types para usar ObjectId

@Schema({ timestamps: true })
export class OrderDocument extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  })
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;

  @Prop({ required: true })
  total: number;

  @Prop({
    required: true,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  // Estas propiedades son agregadas automáticamente por Mongoose
  createdAt: Date;
  updatedAt: Date;

  // Declara explícitamente que _id es de tipo ObjectId sin sobrescribirlo
  declare _id: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);