import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ScoutsModule } from './scouts/scouts.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, ScoutsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
