import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  list(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      select: { id: true, name: true, email: true, role: true, isActive: true, sector: true, createdAt: true },
      orderBy: { name: 'asc' },
    });
  }

  async create(tenantId: string, dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 12);
    return this.prisma.user.create({
      data: { tenantId, name: dto.name, email: dto.email, passwordHash, role: dto.role, sectorId: dto.sectorId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  }
}
