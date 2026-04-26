import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class QueryDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({default: 1, minimum: 1})
  @Type(()=> Number)
  page?: number = 1;

  @IsInt()
  @IsOptional()
  @ApiProperty({default: 10, minimum: 1})
  @Type(()=> Number)
  limit?: number = 10;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search?: string;
}