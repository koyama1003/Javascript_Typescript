import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestObjectService } from './test-object.service';
import { TestObjectController } from './test-object.controller';
import { TestObject } from './test-object';

@Module({
  imports: [TypeOrmModule.forFeature([TestObject])],
  exports: [TypeOrmModule],
  providers: [TestObjectService],
  controllers: [TestObjectController],
})
export class TestObjectModule {}
