import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsAlphanumeric,
} from 'class-validator';

export class CreateUserDto {
  @MaxLength(10)
  @IsAlphanumeric()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  readonly score: number;

  @IsNumber()
  @IsNotEmpty()
  readonly group: number;

  @IsNumber()
  @IsNotEmpty()
  readonly finished: number;
}
