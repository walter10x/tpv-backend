import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderUseCase } from '../../application/use-cases/order.use-case';
import { CreateOrderDto } from '../../application/dtos/create-order.dto';

@Controller('api/v1/orders') // Prefijo para todos los endpoints
export class OrdersController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  // Endpoint de prueba
  @Get('test')
  testEndpoint() {
    return { message: 'Endpoint de prueba funcionando correctamente' };
  }

  // Crear una nueva orden
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderUseCase.createOrder(createOrderDto);
  }

  // Obtener una orden por ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.orderUseCase.getOrderById(id);
  }

  // Actualizar el estado de una orden
  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.orderUseCase.updateOrderStatus(id, status);
  }
}