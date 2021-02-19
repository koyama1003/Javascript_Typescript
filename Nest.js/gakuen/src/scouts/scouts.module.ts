import { Module } from '@nestjs/common';
import { ScoutsService } from './scouts.service';
import { ScoutsController } from './scouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Scout from './entities/scout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scout])],
  controllers: [ScoutsController],
  providers: [ScoutsService],
})
export class ScoutsModule {}
