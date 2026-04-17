import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CurrentUser, RequestUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateSectorDto } from './tenancy.dto';
import { TenancyService } from './tenancy.service';

@ApiBearerAuth()
@ApiTags('Tenancy e setores')
@Controller('tenancy')
export class TenancyController {
  constructor(private readonly tenancy: TenancyService) {}

  @Get('me')
  me(@CurrentUser() user: RequestUser) {
    return this.tenancy.me(user.tenantId);
  }

  @Get('sectors')
  sectors(@CurrentUser() user: RequestUser) {
    return this.tenancy.sectors(user.tenantId);
  }

  @Post('sectors')
  @Roles(Role.ADMIN)
  createSector(@CurrentUser() user: RequestUser, @Body() dto: CreateSectorDto) {
    return this.tenancy.createSector(user.tenantId, dto);
  }
}

