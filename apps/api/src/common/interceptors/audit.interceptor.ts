import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return next.handle().pipe(
      tap(() => {
        if (!user?.tenantId || request.method === 'GET') return;
        void this.prisma.auditLog.create({
          data: {
            tenantId: user.tenantId,
            userId: user.id,
            action: `${request.method} ${request.route?.path ?? request.url}`,
            entity: context.getClass().name,
            ip: request.ip,
            userAgent: request.headers['user-agent'],
          },
        });
      }),
    );
  }
}

