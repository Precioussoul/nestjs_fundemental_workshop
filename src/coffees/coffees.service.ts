import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coffee } from './entity/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Starbucks',
      flavors: ['vanilla', 'caramel', 'chocolate'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: number): Coffee | any {
    const coffee = this.coffees.find((coffee) => coffee.id === id);

    if (!coffee) {
      throw new HttpException(
        `Coffee with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return coffee;
  }

  create(createCoffeeDto: any): void {
    this.coffees.push(createCoffeeDto);
  }

  update(id: number, coffee: Coffee): Coffee {
    const index = this.coffees.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Coffee with id ${id} not found`);
    }
    this.coffees[index] = coffee;
    return coffee;
  }

  delete(id: number): void {
    const index = this.coffees.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Coffee with id ${id} not found`);
    }
    this.coffees.splice(index, 1);
  }
}
