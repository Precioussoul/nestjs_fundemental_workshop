import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Coffee } from './coffees/entity/coffee.entity';
import { Flavor } from './coffees/entity/flavor.entity';
import { Event } from './events/entities/event.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'i_luv_coffee',
  entities: [Coffee, Flavor, Event],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
