import { Spending } from '@koffee-beans/api-interfaces';
import { Injectable } from '@nestjs/common';
import { CreateSpendingDto } from './dto/create-spending.dto';
import { UpdateSpendingDto } from './dto/update-spending.dto';

@Injectable()
export class SpendingsService {
  private readonly spendings: Spending[] = [
    {
      id: 'asdasdas',
      cost: 10.0,
      category: 'grocery',
      shop: 'Tesco',
      notes: '',
    },
    {
      id: 'ahdasdasdjasn',
      cost: 45.25,
      category: 'eat out',
      shop: 'Manchurian',
      notes: '',
    },
  ];

  create(createSpendingDto: CreateSpendingDto) {
    return 'This action adds a new spending';
  }

  findAll(): Spending[] {
    return this.spendings;
  }

  findOne(id: number) {
    return `This action returns a #${id} spending`;
  }

  update(id: number, updateSpendingDto: UpdateSpendingDto) {
    return `This action updates a #${id} spending`;
  }

  remove(id: number) {
    return `This action removes a #${id} spending`;
  }
}
