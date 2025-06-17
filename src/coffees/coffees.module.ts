import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeeSchema } from './entity/coffee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Coffee', schema: CoffeeSchema }]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
