import { Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CurrentUser, RequestUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { FilesService } from './files.service';

@ApiBearerAuth()
@ApiTags('Arquivos')
@Controller('files')
export class FilesController {
  constructor(private readonly files: FilesService) {}

  @Get()
  list(@CurrentUser() user: RequestUser) {
    return this.files.list(user.tenantId);
  }

  @Post('upload')
  @Roles(Role.ADMIN, Role.SERVIDOR, Role.VEREADOR)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @CurrentUser() user: RequestUser,
    @UploadedFile() file: Express.Multer.File,
    @Query('documentId') documentId?: string,
    @Query('processId') processId?: string,
    @Query('esicId') esicId?: string,
  ) {
    return this.files.upload(user.tenantId, user.id, file, { documentId, processId, esicId });
  }
}

