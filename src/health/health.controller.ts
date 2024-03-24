import { PrismaClient } from '@prisma/client'
import { Controller, Get } from '@nestjs/common'
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  PrismaHealthIndicator,
} from '@nestjs/terminus'
import { Public } from 'src/auth/decorators/public.decorator'

@Controller('api/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private prisma: PrismaHealthIndicator,
    private prismaClient: PrismaClient
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('http', 'https://google.com'),
      () => this.prisma.pingCheck('prisma', this.prismaClient),
    ])
  }
}
