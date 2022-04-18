import { IsNotEmpty, IsBoolean, IsString, IsNumber } from 'class-validator';
export class CreateSubmittedDto {
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly questionId: string;

  @IsBoolean()
  readonly status: boolean;

  @IsString()
  readonly result: string;

  @IsNumber()
  score: number;
}
