import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import type { Request } from 'express';
import { AllowedRoles } from 'src/auth/decorators/allowed-roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @AllowedRoles('admin')
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll(@Req() req: Request) {
    const currentUser = req.user;
    const products = await this.productsService.findAll(currentUser);
    return plainToInstance(ProductResponseDto, products, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @AllowedRoles('admin')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(id, updateProductDto);
    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id/status')
  @AllowedRoles('admin')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductStatusDto: UpdateProductStatusDto,
  ) {
    const product = await this.productsService.updateStatus(
      id,
      updateProductStatusDto.isActive,
    );
    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @AllowedRoles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
