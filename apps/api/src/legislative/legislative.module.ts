import { Module } from '@nestjs/common';
import { LegislativeController } from './legislative.controller';
import { LegislativeService } from './legislative.service';

@Module({
  controllers: [LegislativeController],
  providers: [LegislativeService],
})
export class LegislativeModule {}

