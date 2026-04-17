import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CurrentUser, RequestUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateLegislativeDocumentDto, CreateSessionDto, MoveDocumentDto, RegisterVoteDto } from './legislative.dto';
import { LegislativeService } from './legislative.service';

@ApiBearerAuth()
@ApiTags('Legislativo')
@Controller('legislative')
export class LegislativeController {
  constructor(private readonly legislative: LegislativeService) {}

  @Get('documents')
  documents(@CurrentUser() user: RequestUser) {
    return this.legislative.documents(user.tenantId);
  }

  @Post('documents')
  @Roles(Role.ADMIN, Role.SERVIDOR, Role.VEREADOR)
  createDocument(@CurrentUser() user: RequestUser, @Body() dto: CreateLegislativeDocumentDto) {
    return this.legislative.createDocument(user.tenantId, dto);
  }

  @Post('documents/:id/movements')
  @Roles(Role.ADMIN, Role.SERVIDOR)
  move(@Param('id') id: string, @Body() dto: MoveDocumentDto) {
    return this.legislative.moveDocument(id, dto);
  }

  @Get('sessions')
  sessions(@CurrentUser() user: RequestUser) {
    return this.legislative.sessions(user.tenantId);
  }

  @Post('sessions')
  @Roles(Role.ADMIN, Role.SERVIDOR)
  createSession(@CurrentUser() user: RequestUser, @Body() dto: CreateSessionDto) {
    return this.legislative.createSession(user.tenantId, dto);
  }

  @Post('votes')
  @Roles(Role.VEREADOR)
  vote(@CurrentUser() user: RequestUser, @Body() dto: RegisterVoteDto) {
    return this.legislative.vote(user.tenantId, user.id, dto);
  }
}

