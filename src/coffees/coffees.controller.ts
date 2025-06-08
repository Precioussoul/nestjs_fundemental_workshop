import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery: any) {
    const { limit, offset } = paginationQuery;
    if (limit && offset) {
      return `this action will return all coffees with limit ${limit} and offset ${offset}`;
    }
    return ['espresso', 'americano', 'latte', 'cappuccino', 'mocha'];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `espresso ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return `this action will update espresso ${id}`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `this action will delete espresso ${id}`;
  }
}
