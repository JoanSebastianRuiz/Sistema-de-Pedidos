import { ConflictException, Injectable } from '@nestjs/common';
import { CurrentUserDto } from 'src/shared/domain/current-user.dto';
import { PRODUCT_ERROR_CODES } from 'src/shared/errors';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    const existingProduct = await this.productsRepository.findByName(
      createProductDto.name,
    );

    if (existingProduct) {
      throw new ConflictException({
        message: PRODUCT_ERROR_CODES.NAME_ALREADY_EXISTS,
      });
    }

    const productWithSameName = await this.productsRepository.findByName(
      createProductDto.name,
    );

    if (productWithSameName) {
      throw new ConflictException({
        message: PRODUCT_ERROR_CODES.NAME_ALREADY_EXISTS,
      });
    }
    return await this.productsRepository.create(createProductDto);
  }

  findAll(currentUser: CurrentUserDto) {
    return this.productsRepository.findAll(currentUser.role.toString());
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.productsRepository.findById(id);
    if (!existingProduct) {
      throw new ConflictException({
        message: PRODUCT_ERROR_CODES.PRODUCT_NOT_FOUND,
      });
    }

    const productWithSameName = await this.productsRepository.findByName(
      updateProductDto.name!,
    );

    if (productWithSameName && productWithSameName.id !== id) {
      throw new ConflictException({
        message: PRODUCT_ERROR_CODES.NAME_ALREADY_EXISTS,
      });
    }

    return await this.productsRepository.update(id, updateProductDto);
  }

  async updateStatus(id: number, isActive: boolean) {
    const existingProduct = await this.productsRepository.findById(id);
    if (!existingProduct) {
      throw new ConflictException({
        message: PRODUCT_ERROR_CODES.PRODUCT_NOT_FOUND,
      });
    }
    return await this.productsRepository.updateStatus(id, isActive);
  }

  async remove(id: number) {
    const existingProduct = await this.productsRepository.findById(id);
    if (!existingProduct) {
      throw new ConflictException({
        message: PRODUCT_ERROR_CODES.PRODUCT_NOT_FOUND,
      });
    }
    return await this.productsRepository.remove(id);
  }
}
