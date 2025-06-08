import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entity/coffee.entity';
import { UpdateCofeeDto } from './dto/update-cofee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

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
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto): Coffee {
    const newCoffee: Coffee = {
      id: Math.max(0, ...this.coffees.map((coffee) => coffee.id)) + 1,
      ...createCoffeeDto,
    };
    this.coffees.push(newCoffee);
    return newCoffee;
  }

  update(id: number, updateCoffeeDto: UpdateCofeeDto): Coffee {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === id);
    if (coffeeIndex === -1) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    const coffee = this.coffees[coffeeIndex];
    // Create a new object with the existing coffee properties and override with the DTO
    const updatedCoffee = {
      ...coffee,
      ...updateCoffeeDto,
      id, // Ensure the ID is preserved
    };

    this.coffees[coffeeIndex] = updatedCoffee;
    return updatedCoffee;
  }

  delete(id: number): void {
    const index = this.coffees.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    this.coffees.splice(index, 1);
  }
}
