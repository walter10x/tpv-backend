// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './infrastructure/schemas/order.schema';
import { OrdersController } from './infrastructure/controllers/orders.controller';
import { OrderUseCase } from './application/use-cases/order.use-case';
import { MongoOrderRepository } from './infrastructure/repositories/mongo-order.repository';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule y ConfigService

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Asegúrate de que la ruta a tu archivo .env sea correcta
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({ // Usamos forRootAsync para inyectar ConfigService
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [
    OrderUseCase,
    { provide: 'OrderRepository', useClass: MongoOrderRepository },
  ],
})
export class AppModule {}