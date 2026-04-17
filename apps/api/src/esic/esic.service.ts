import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestStatus } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateEsicRequestDto } from './esic.dto';

@Injectable()
export class EsicService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEsicRequestDto) {
    const tenant = await this.prisma.tenant.findUnique({ where: { slug: dto.tenantSlug } });
    if (!tenant) throw new NotFoundException('Camara nao encontrada');
    const count = await this.prisma.esicRequest.count({ where: { tenantId: tenant.id } });
    const protocol = `ESIC-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 20);
    return this.prisma.esicRequest.create({
      data: {
        tenantId: tenant.id,
        protocol,
        dueDate,
        requesterName: dto.requesterName,
        requesterEmail: dto.requesterEmail,
        subject: dto.subject,
        description: dto.description,
      },
      select: { protocol: true, status: true, dueDate: true, createdAt: true },
    });
  }

  publicStatus(protocol: string) {
    return this.prisma.esicRequest.findFirst({
      where: { protocol },
      select: { protocol: true, subject: true, status: true, dueDate: true, answer: true, answeredAt: true },
    });
  }

  list(tenantId: string) {
    return this.prisma.esicRequest.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } });
  }

  answer(id: string, answer: string) {
    return this.prisma.esicRequest.update({
      where: { id },
      data: { answer, status: RequestStatus.ANSWERED, answeredAt: new Date() },
    });
  }
}

