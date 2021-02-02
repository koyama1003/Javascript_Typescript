import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  users: CreateUserDto[] = [];
  async create(user: CreateUserDto) {
    const createdUser = new this.userModel({
      username: user.username,
      password: await bcrypt.hash(user.password, 12),
    });
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (user) {
      return user;
    } else {
      throw new NotFoundException("Couldn't find user");
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
