import { Test, TestingModule } from '@nestjs/testing';
import { HopitalService } from './hopital.service';

describe('HopitalService', () => {
  let service: HopitalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HopitalService],
    }).compile();

    service = module.get<HopitalService>(HopitalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
