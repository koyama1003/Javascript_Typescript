import { Test, TestingModule } from '@nestjs/testing';
import { ScoutsService } from './scouts.service';

describe('ScoutsService', () => {
  let service: ScoutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoutsService],
    }).compile();

    service = module.get<ScoutsService>(ScoutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
