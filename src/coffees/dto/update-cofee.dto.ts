import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCofeeDto extends PartialType(CreateCoffeeDto) {}
