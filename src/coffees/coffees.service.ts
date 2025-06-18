import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entity/coffee.entity';
import { UpdateCofeeDto } from './dto/update-cofee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}

  findAll() {
    return this.coffeeModel.find().exec();
  }

  async findOne(id: string): Promise<Coffee | null> {
    try {
      const coffee = await this.coffeeModel.findById(id).exec();
      return coffee;
    } catch (error) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
  }

  create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const newCoffee: Coffee = new this.coffeeModel(createCoffeeDto);
    return newCoffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCofeeDto): Promise<Coffee> {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    return existingCoffee;
  }

  async delete(id: string) {
    const coffee = await this.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    return coffee.deleteOne().exec();
  }
}
