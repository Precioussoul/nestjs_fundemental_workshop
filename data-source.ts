import { DataSource } from 'typeorm';
import { Coffee } from './src/coffees/entity/coffee.entity';
import { Flavor } from './src/coffees/entity/flavor.entity';
import { Event } from './src/events/entities/event.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'i_luv_coffee',
  entities: [Coffee, Flavor, Event],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // use migrations
});
