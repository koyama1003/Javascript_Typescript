import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { TestObject } from './test-object';

@Injectable()
export class TestObjectService {
  constructor(
    @InjectRepository(TestObject)
    private readonly repository: Repository<TestObject>,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async all(): Promise<TestObject[]> {
    return this.repository.find();
  }

  async one(id: number): Promise<TestObject> {
    return this.repository.findOne(id);
  }

  async create(data: Partial<TestObject>): Promise<TestObject> {
    return this.repository.save(data);
  }

  async update(id: number, data: Partial<TestObject>): Promise<void> {
    const origin = await this.repository.findOne(id);
    const updateData = Object.assign(origin, data); // 上書き
    this.repository.save(updateData);
  }

  async remove(id: number): Promise<void> {
    const obj = await this.repository.findOne(id);
    this.repository.remove(obj);
  }
}
