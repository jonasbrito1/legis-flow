import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async get(tenantId: string) {
    const [documents, sessions, processes, esicOpen, files] = await Promise.all([
      this.prisma.legislativeDocument.count({ where: { tenantId } }),
      this.prisma.plenarySession.count({ where: { tenantId } }),
      this.prisma.administrativeProcess.count({ where: { tenantId } }),
      this.prisma.esicRequest.count({ where: { tenantId, status: { in: ['OPEN', 'IN_PROGRESS', 'OVERDUE'] } } }),
      this.prisma.fileObject.count({ where: { tenantId } }),
    ]);
    return { documents, sessions, processes, esicOpen, files };
  }
}

