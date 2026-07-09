import { Test, TestingModule } from '@nestjs/testing';
import { HopitalController } from './hopital.controller';

describe('HopitalController', () => {
  let controller: HopitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HopitalController],
    }).compile();

    controller = module.get<HopitalController>(HopitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
