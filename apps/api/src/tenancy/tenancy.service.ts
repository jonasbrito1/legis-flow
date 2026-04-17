import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateSectorDto } from './tenancy.dto';

@Injectable()
export class TenancyService {
  constructor(private readonly prisma: PrismaService) {}

  me(tenantId: string) {
    return this.prisma.tenant.findUnique({ where: { id: tenantId } });
  }

  sectors(tenantId: string) {
    return this.prisma.sector.findMany({ where: { tenantId }, orderBy: { name: 'asc' } });
  }

  createSector(tenantId: string, dto: CreateSectorDto) {
    return this.prisma.sector.create({ data: { ...dto, tenantId } });
  }
}

