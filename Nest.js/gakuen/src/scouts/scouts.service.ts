import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoutDto } from './dto/create-scout.dto';
import { UpdateScoutDto } from './dto/update-scout.dto';
import Scout from './entities/scout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class ScoutsService {
  constructor(
    @InjectRepository(Scout)
    private repository: Repository<Scout>,
    private readonly connection: Connection,
  ) {}
  async create(createScoutDto: CreateScoutDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(Scout, createScoutDto);
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

  async findOne(id: number): Promise<Scout> {
    const scout = await this.repository.findOne(+id);
    if (!scout) {
      throw new NotFoundException();
    }
    return scout;
  }

  async update(id: number, updateScoutDto: UpdateScoutDto) {
    const scout = await this.repository.findOne(+id);
    if (!scout) {
      throw new NotFoundException();
    }
    await this.repository.update(scout, updateScoutDto);
    return scout;
  }

  async remove(id: number) {
    const scout = await this.repository.findOne(+id);
    if (!scout) {
      throw new NotFoundException();
    }
    await this.repository.softDelete({ id });
  }
}
