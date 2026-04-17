import { IsEmail, IsString } from 'class-validator';

export class CreateEsicRequestDto {
  @IsString()
  tenantSlug!: string;

  @IsString()
  requesterName!: string;

  @IsEmail()
  requesterEmail!: string;

  @IsString()
  subject!: string;

  @IsString()
  description!: string;
}

export class AnswerEsicDto {
  @IsString()
  answer!: string;
}

