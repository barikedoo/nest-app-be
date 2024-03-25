import { Module } from '@nestjs/common'
import { OKXService } from './okx.service'
import { ExternalWsGatewayService } from 'src/websockets/ws.service'
import { TelegramService } from 'src/telegram/telegram.service'

@Module({
  providers: [OKXService, ExternalWsGatewayService, TelegramService],
})
export class OKXModule {}
