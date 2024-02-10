import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [TerminusModule, HttpModule, PrismaModule],
  providers: [PrismaClient],
  controllers: [HealthController],
})
export class HealthModule {}
