import { Test, TestingModule } from '@nestjs/testing';
import { StockLocationController } from './stock-location.controller';
import { StockLocationService } from './stock-location.service';

describe('StockLocationController', () => {
  let controller: StockLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockLocationController],
      providers: [StockLocationService],
    }).compile();

    controller = module.get<StockLocationController>(StockLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
