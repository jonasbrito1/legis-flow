import { VoteChoice } from '@prisma/client';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLegislativeDocumentDto {
  @IsString()
  number!: string;

  @IsInt()
  year!: number;

  @IsString()
  type!: string;

  @IsString()
  title!: string;

  @IsString()
  summary!: string;

  @IsString()
  author!: string;
}

export class MoveDocumentDto {
  @IsOptional()
  @IsString()
  fromSector?: string;

  @IsString()
  toSector!: string;

  @IsString()
  action!: string;

  @IsString()
  description!: string;
}

export class CreateSessionDto {
  @IsString()
  title!: string;

  @IsDateString()
  date!: string;

  @IsString()
  agenda!: string;
}

export class RegisterVoteDto {
  @IsString()
  sessionId!: string;

  @IsString()
  documentId!: string;

  @IsEnum(VoteChoice)
  choice!: VoteChoice;
}

