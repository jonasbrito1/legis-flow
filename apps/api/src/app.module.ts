import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AdministrativeModule } from './administrative/administrative.module';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { PrismaModule } from './common/prisma/prisma.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EsicModule } from './esic/esic.module';
import { FilesModule } from './files/files.module';
import { HealthModule } from './health/health.module';
import { LegislativeModule } from './legislative/legislative.module';
import { TenancyModule } from './tenancy/tenancy.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    TenancyModule,
    UsersModule,
    LegislativeModule,
    AdministrativeModule,
    EsicModule,
    FilesModule,
    DashboardModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: AuditInterceptor },
  ],
})
export class AppModule {}

