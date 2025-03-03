import { Test, TestingModule } from '@nestjs/testing';
import { KavezoService } from './kavezo.service';

describe('KavezoService', () => {
  let service: KavezoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KavezoService],
    }).compile();

    service = module.get<KavezoService>(KavezoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
