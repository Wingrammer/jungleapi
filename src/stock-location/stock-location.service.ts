import { Injectable } from '@nestjs/common';
import { CreateStockLocationDto } from './dto/create-stock-location.dto';
import { UpdateStockLocationDto } from './dto/update-stock-location.dto';

@Injectable()
export class StockLocationService {
  create(createStockLocationDto: CreateStockLocationDto) {
    return 'This action adds a new stockLocation';
  }

  findAll() {
    return `This action returns all stockLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockLocation`;
  }

  update(id: number, updateStockLocationDto: UpdateStockLocationDto) {
    return `This action updates a #${id} stockLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockLocation`;
  }
}
