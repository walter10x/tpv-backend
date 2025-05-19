import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument, OrderSchema } from '../schemas/order.schema';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order, OrderItem } from '../../domain/entities/order.entity';

@Injectable()
export class MongoOrderRepository implements OrderRepository {
  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
  ) {}

  async create(order: Order): Promise<Order> {
    const createdOrder = new this.orderModel({
      userId: order.userId,
      items: order.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      total: order.total,
      status: order.status,
    });
    const savedOrder = await createdOrder.save();
    return this.toDomain(savedOrder);
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.orderModel.findById(id).exec();
    return order ? this.toDomain(order) : null;
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).exec();
    if (!updatedOrder) throw new Error('Order not found');
    return this.toDomain(updatedOrder);
  }

  private toDomain(orderDocument: OrderDocument): Order {
    return new Order(
      orderDocument._id.toString(),
      orderDocument.userId,
      orderDocument.items.map(
        item => new OrderItem(item.productId, item.quantity, item.price),
      ),
      orderDocument.total,
      orderDocument.status as 'pending' | 'completed' | 'cancelled',
      orderDocument.createdAt,
      orderDocument.updatedAt,
    );
  }
}