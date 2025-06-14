import { registerAs } from '@nestjs/config';

export default registerAs('coffees', () => ({
  name: 'Coffee',
  price: 10,
}));
