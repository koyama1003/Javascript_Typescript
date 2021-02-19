import { Injectable, Inject } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { Photo } from './photo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    private connection: Connection,
  ) {}

  async create(photo: Partial<Photo>): Promise<Photo> {
    return this.photoRepository.save(photo);
  }

  async update(id: number, data: Partial<Photo>): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const origin = await queryRunner.manager
        .getRepository(Photo)
        .createQueryBuilder('photo')
        .useTransaction(true)
        .setLock('pessimistic_write')
        .where('photo.id = :id', { id: id })
        .getOne();
      const updateData = Object.assign(origin, data); // 上書き
      await queryRunner.manager.save(updateData);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }
  async findOne(id: number): Promise<Photo> {
    return this.photoRepository.findOne(id);
  }
  async remove(id: number): Promise<void> {
    await this.photoRepository.delete(id);
  }
}
