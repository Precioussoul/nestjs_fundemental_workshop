import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeeSchema } from './entity/coffee.entity';
import { EventEntitySchema } from '../events/entities/event-entity/event-entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Coffee', schema: CoffeeSchema },
      { name: 'Event', schema: EventEntitySchema },
    ]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
