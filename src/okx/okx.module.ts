import { Module } from '@nestjs/common'
import { OKXController } from './okx.controller'
import { OKXService } from './okx.service'
import { ExternalWsGatewayService } from 'src/websockets/ws.service'

@Module({
  controllers: [OKXController],
  providers: [OKXService, ExternalWsGatewayService],
})
export class OkxModule {}
