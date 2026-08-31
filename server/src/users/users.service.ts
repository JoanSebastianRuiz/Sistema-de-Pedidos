import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { USER_ERROR_CODES } from 'src/shared/errors';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException({
        message: USER_ERROR_CODES.EMAIL_ALREADY_EXISTS,
      });
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 12);
    const createdUser = await this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash,
    });

    return createdUser;
  }
}
