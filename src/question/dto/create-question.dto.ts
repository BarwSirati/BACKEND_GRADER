import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  title: string;

  input: string;

  output: string;

  detail: string;

  @IsNumber()
  rank: number;

  @IsBoolean()
  status: boolean;

  @IsNumber()
  finished: number;
}
