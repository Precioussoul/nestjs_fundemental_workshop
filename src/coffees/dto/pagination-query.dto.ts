import { IsOptional, IsPositive } from 'class-validator';

export class PaginatedQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
