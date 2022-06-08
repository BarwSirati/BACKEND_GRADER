import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsAlphanumeric,
} from 'class-validator';
import { isFloat64Array } from 'util/types';

export class GetUserDto {
  @MaxLength(10)
  @IsAlphanumeric()
  name: string;

  @IsString()
  username: string;

  @IsNumber()
  score: number;

  @IsNumber()
  group: number;

  @IsNumber()
  finished: number;

  @IsNumber()
  rank: number;

  @IsNumber()
  progress: string;
}
