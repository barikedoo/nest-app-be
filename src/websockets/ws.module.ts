import { Module } from '@nestjs/common'
import { ExternalWsGatewayService } from './ws.service'

@Module({
  providers: [ExternalWsGatewayService],
  exports: [ExternalWsGatewayService],
})
export class WSModule {}
