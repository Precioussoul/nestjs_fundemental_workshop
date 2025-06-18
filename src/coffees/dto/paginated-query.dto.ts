import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginatedQueryDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  offset: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
