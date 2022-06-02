import { IsString, IsNumber, IsBoolean, IsObject } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  title: string;

  unit: string;

  @IsObject()
  input: object;

  @IsObject()
  output: object;

  detail: string;

  detail_input: string;

  detail_output: string;

  note: string;

  @IsObject()
  ex_input: object;

  @IsObject()
  ex_output: object;

  image: string;

  pdfLink: string;

  @IsNumber()
  rank: number;

  @IsBoolean()
  status: boolean;

  @IsNumber()
  finished: number;
}
