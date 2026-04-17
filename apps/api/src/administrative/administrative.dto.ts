import { IsOptional, IsString } from 'class-validator';

export class CreateProcessDto {
  @IsString()
  subject!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsString()
  sectorId?: string;
}

