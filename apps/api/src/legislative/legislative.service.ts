import { Injectable } from '@nestjs/common';
import { LegislativeStatus } from '@prisma/client';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateLegislativeDocumentDto, CreateSessionDto, MoveDocumentDto, RegisterVoteDto } from './legislative.dto';

@Injectable()
export class LegislativeService {
  constructor(private readonly prisma: PrismaService) {}

  documents(tenantId: string) {
    return this.prisma.legislativeDocument.findMany({
      where: { tenantId },
      include: { movements: { orderBy: { createdAt: 'desc' } }, votes: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  createDocument(tenantId: string, dto: CreateLegislativeDocumentDto) {
    return this.prisma.legislativeDocument.create({
      data: {
        ...dto,
        tenantId,
        protocol: `${dto.type}-${dto.year}-${dto.number}`,
        status: LegislativeStatus.PROTOCOLLED,
      },
    });
  }

  async moveDocument(documentId: string, dto: MoveDocumentDto) {
    return this.prisma.$transaction([
      this.prisma.legislativeMovement.create({ data: { documentId, ...dto } }),
      this.prisma.legislativeDocument.update({ where: { id: documentId }, data: { status: LegislativeStatus.IN_REVIEW } }),
    ]);
  }

  sessions(tenantId: string) {
    return this.prisma.plenarySession.findMany({ where: { tenantId }, include: { votes: true }, orderBy: { date: 'desc' } });
  }

  createSession(tenantId: string, dto: CreateSessionDto) {
    return this.prisma.plenarySession.create({ data: { ...dto, tenantId, date: new Date(dto.date) } });
  }

  vote(tenantId: string, userId: string, dto: RegisterVoteDto) {
    return this.prisma.vote.upsert({
      where: { sessionId_documentId_userId: { sessionId: dto.sessionId, documentId: dto.documentId, userId } },
      update: { choice: dto.choice },
      create: { tenantId, userId, ...dto },
    });
  }
}

