import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entity/coffee.entity';
import { UpdateCofeeDto } from './dto/update-cofee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedQueryDto } from './dto/paginated-query.dto';
import { EventEntity } from '../events/entities/event-entity/event-entity';
import { Connection } from 'mongoose';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(EventEntity.name)
    private readonly eventModel: Model<EventEntity>,
  ) {}

  findAll(paginationQuery: PaginatedQueryDto) {
    const { offset, limit } = paginationQuery;
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
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

  async recommendCoffee(coffee: Coffee) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      coffee.recommendations += 1;

      const recommmendEvent = new this.eventModel({
        name: 'Coffee Recommended',
        description: 'Coffee Recommended',
        payload: coffee,
      });

      await recommmendEvent.save({ session });
      await coffee.save({ session });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }
}
