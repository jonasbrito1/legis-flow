import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser, RequestUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { AnswerEsicDto, CreateEsicRequestDto } from './esic.dto';
import { EsicService } from './esic.service';

@ApiTags('e-SIC')
@Controller('esic')
export class EsicController {
  constructor(private readonly esic: EsicService) {}

  @Public()
  @Post('requests')
  create(@Body() dto: CreateEsicRequestDto) {
    return this.esic.create(dto);
  }

  @Public()
  @Get('requests/:protocol/public')
  publicStatus(@Param('protocol') protocol: string) {
    return this.esic.publicStatus(protocol);
  }

  @ApiBearerAuth()
  @Get('requests')
  @Roles(Role.ADMIN, Role.SERVIDOR)
  list(@CurrentUser() user: RequestUser) {
    return this.esic.list(user.tenantId);
  }

  @ApiBearerAuth()
  @Post('requests/:id/answer')
  @Roles(Role.ADMIN, Role.SERVIDOR)
  answer(@Param('id') id: string, @Body() dto: AnswerEsicDto) {
    return this.esic.answer(id, dto.answer);
  }
}

