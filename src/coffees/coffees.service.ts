import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entity/coffee.entity';
import { UpdateCofeeDto } from './dto/update-cofee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Flavor } from './entity/flavor.entity';
import { PaginatedQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll(paginationQuery: PaginatedQueryDto): Promise<Coffee[]> {
    return this.coffeesRepository.find({
      relations: ['flavors'],
      take: paginationQuery.limit,
      skip: paginationQuery.offset,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeesRepository.findOne({
      where: { id: Number(id) },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const newCoffee: Coffee = this.coffeesRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeesRepository.save(newCoffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCofeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeesRepository.preload({
      id: Number(id),
      ...updateCoffeeDto,
      flavors: flavors,
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

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavors = await this.flavorRepository.findOne({
      where: { name },
    });

    if (flavors) {
      return flavors;
    }
    return this.flavorRepository.create({ name });
  }
}
