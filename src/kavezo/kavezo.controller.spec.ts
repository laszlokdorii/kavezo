import { Test, TestingModule } from '@nestjs/testing';
import { KavezoController } from './kavezo.controller';
import { KavezoService } from './kavezo.service';

describe('KavezoController', () => {
  let controller: KavezoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KavezoController],
      providers: [KavezoService],
    }).compile();

    controller = module.get<KavezoController>(KavezoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
