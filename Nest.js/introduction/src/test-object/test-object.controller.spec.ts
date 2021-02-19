import { Test, TestingModule } from '@nestjs/testing';
import { TestObjectController } from './test-object.controller';
import { TestObjectService } from './test-object.service';

describe('TestObjectController', () => {
  let controller: TestObjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestObjectController],
      providers: [TestObjectService],
    }).compile();

    controller = module.get<TestObjectController>(TestObjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
