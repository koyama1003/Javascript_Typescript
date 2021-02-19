import { Test, TestingModule } from '@nestjs/testing';
import { ScoutsController } from './scouts.controller';
import { ScoutsService } from './scouts.service';

describe('ScoutsController', () => {
  let controller: ScoutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoutsController],
      providers: [ScoutsService],
    }).compile();

    controller = module.get<ScoutsController>(ScoutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
