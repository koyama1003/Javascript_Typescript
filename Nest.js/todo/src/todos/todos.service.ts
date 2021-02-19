import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly repository: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    const user: User = {
      id: 1,
      username: 'testuser',
      password: 'test',
      todos: [],
    };
    const newTodo = await this.repository.create({
      ...createTodoDto,
      user: user,
    });
    await this.repository.save(newTodo);
    return newTodo;
  }

  async findAll(): Promise<Todo[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return await this.repository.findOne(+id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
