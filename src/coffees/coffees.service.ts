import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entity/coffee.entity';
import { UpdateCofeeDto } from './dto/update-cofee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {}

  findAll(): Promise<Coffee[]> {
    return this.coffeesRepository.find();
  }

  async findOne(id: string) {
    const coffee = await this.coffeesRepository.findOne({
      where: { id: Number(id) },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const newCoffee: Coffee = this.coffeesRepository.create(createCoffeeDto);
    return this.coffeesRepository.save(newCoffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCofeeDto) {
    const coffee = await this.coffeesRepository.preload({
      id: Number(id),
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    return this.coffeesRepository.save(coffee);
  }

  async delete(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeesRepository.remove(coffee);
  }
}
