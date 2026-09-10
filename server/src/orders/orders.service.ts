import { ConflictException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUserDto } from 'src/shared/domain/current-user.dto';
import { OrdersRepository } from './orders.repository';
import { ORDER_ERROR_CODES } from 'src/shared/errors';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(createOrderDto: CreateOrderDto, currentUser: CurrentUserDto) {
    if (!currentUser) {
      throw new ConflictException({
        message: ORDER_ERROR_CODES.USER_NOT_FOUND,
      });
    }

    if (createOrderDto.orderDetails.length === 0) {
      throw new ConflictException({
        message: ORDER_ERROR_CODES.ORDER_DETAILS_INVALID,
      });
    }
    return await this.ordersRepository.create(createOrderDto, currentUser);
  }

  async findAll(currentUser: CurrentUserDto) {
    if (!currentUser) {
      throw new ConflictException({
        message: ORDER_ERROR_CODES.USER_NOT_FOUND,
      });
    }
    return await this.ordersRepository.findAll(currentUser);
  }

  async updateStatus(
    id: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
    currentUser: CurrentUserDto,
  ) {
    if (!currentUser) {
      throw new ConflictException({
        message: ORDER_ERROR_CODES.USER_NOT_FOUND,
      });
    }

    const existingOrder = await this.ordersRepository.findById(id, currentUser);
    if (!existingOrder) {
      throw new ConflictException({
        message: ORDER_ERROR_CODES.ORDER_NOT_FOUND,
      });
    }

    return await this.ordersRepository.updateStatus(
      id,
      updateOrderStatusDto.status,
      currentUser,
    );
  }
}
