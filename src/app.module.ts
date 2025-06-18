import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CoffeesModule,
    MongooseModule.forRoot(
      'mongodb://admin:admin123@localhost:27017/iluvcoffee_mongo?authSource=admin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
