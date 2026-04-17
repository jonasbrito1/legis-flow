import { IsString } from 'class-validator';

export class CreateSectorDto {
  @IsString()
  name!: string;

  @IsString()
  acronym!: string;
}

