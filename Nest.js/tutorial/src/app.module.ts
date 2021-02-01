import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemosModule } from './memo/memos/memos.module';
import { MemosModule } from './memo/memos/memos.module';
import { MemosModule } from './memo/memos/memos.module';

@Module({
  imports: [TypeOrmModule.forRoot(), MemosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
