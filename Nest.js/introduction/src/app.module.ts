import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestObjectModule } from './test-object/test-object.module';
import { TestObject } from './test-object/test-object';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'izayoi1003',
      database: 'typeorm',
      entities: [TestObject],
      synchronize: true,
    }),
    CatsModule,
    TestObjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
