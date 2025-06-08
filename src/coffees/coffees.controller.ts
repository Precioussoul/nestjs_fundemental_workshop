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
    return this.coffeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: any) {
    return this.coffeeService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.coffeeService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coffeeService.delete(Number(id));
  }
}
