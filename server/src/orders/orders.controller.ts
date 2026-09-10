import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { plainToInstance } from 'class-transformer';
import { OrderResponseDto } from './dto/order-response.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    const currentUser = req.user;
    const order = await this.ordersService.create(createOrderDto, currentUser);
    return plainToInstance(OrderResponseDto, order, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll(@Req() res: Request) {
    const currentUser = res.user;
    const orders = await this.ordersService.findAll(currentUser);
    return plainToInstance(OrderResponseDto, orders, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id/status')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const currentUser = req.user;
    return this.ordersService.updateStatus(
      id,
      updateOrderStatusDto,
      currentUser,
    );
  }
}
