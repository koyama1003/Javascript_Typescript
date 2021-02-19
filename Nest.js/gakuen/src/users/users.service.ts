import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const example: Array<string> = [];
    console.log(example);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(User, createUserDto);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    const found = await this.repository.findOne(+id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.repository.findOne(+id);
    if (!user) {
      throw new NotFoundException();
    }
    await this.repository.update(user, updateUserDto);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts[postIndex] = post;
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number): Promise<void> {
    const user = await this.repository.findOne(+id);
    if (!user) {
      throw new NotFoundException();
    }
    await this.repository.delete(+id);
  }
}
