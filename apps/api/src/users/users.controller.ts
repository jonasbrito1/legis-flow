import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CurrentUser, RequestUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SERVIDOR)
  list(@CurrentUser() user: RequestUser) {
    return this.users.list(user.tenantId);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@CurrentUser() user: RequestUser, @Body() dto: CreateUserDto) {
    return this.users.create(user.tenantId, dto);
  }
}

