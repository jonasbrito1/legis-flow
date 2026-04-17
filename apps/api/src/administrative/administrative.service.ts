import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateProcessDto } from './administrative.dto';

@Injectable()
export class AdministrativeService {
  constructor(private readonly prisma: PrismaService) {}

  processes(tenantId: string) {
    return this.prisma.administrativeProcess.findMany({
      where: { tenantId },
      include: { sector: true, files: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createProcess(tenantId: string, dto: CreateProcessDto) {
    const count = await this.prisma.administrativeProcess.count({ where: { tenantId } });
    const protocol = `ADM-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`;
    return this.prisma.administrativeProcess.create({ data: { ...dto, tenantId, protocol } });
  }
}

