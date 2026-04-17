import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CurrentUser, RequestUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateProcessDto } from './administrative.dto';
import { AdministrativeService } from './administrative.service';

@ApiBearerAuth()
@ApiTags('Administrativo')
@Controller('administrative')
export class AdministrativeController {
  constructor(private readonly administrative: AdministrativeService) {}

  @Get('processes')
  @Roles(Role.ADMIN, Role.SERVIDOR)
  processes(@CurrentUser() user: RequestUser) {
    return this.administrative.processes(user.tenantId);
  }

  @Post('processes')
  @Roles(Role.ADMIN, Role.SERVIDOR)
  createProcess(@CurrentUser() user: RequestUser, @Body() dto: CreateProcessDto) {
    return this.administrative.createProcess(user.tenantId, dto);
  }
}

