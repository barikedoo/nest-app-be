import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
