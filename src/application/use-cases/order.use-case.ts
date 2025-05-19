import { Injectable, Inject } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order, OrderItem } from '../../domain/entities/order.entity';

@Injectable()
export class OrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const total = dto.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const order = new Order(
      Date.now().toString(), // ID temporal (usar UUID en producción)
      dto.userId,
      dto.items.map(item => new OrderItem(item.productId, item.quantity, item.price)),
      total,
      'pending',
      new Date(),
      new Date(),
    );

    return this.orderRepository.create(order);
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    return this.orderRepository.updateStatus(id, status);
  }
}