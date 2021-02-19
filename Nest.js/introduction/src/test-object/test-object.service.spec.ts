import { Test, TestingModule } from '@nestjs/testing';
import { TestObjectService } from './test-object.service';

describe('TestObjectService', () => {
  let service: TestObjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestObjectService],
    }).compile();

    service = module.get<TestObjectService>(TestObjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
