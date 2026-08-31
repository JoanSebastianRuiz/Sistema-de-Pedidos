import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import type { Request } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll(@Res() res: Request) {
    const currentUser = res.user;
    const orders = await this.ordersService.findAll();
    return plainToInstance;
  }

  @Patch(':id/status')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }
}
