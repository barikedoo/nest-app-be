import { Module } from '@nestjs/common'
import { OKXController } from './okx.controller'
import { OKXService } from './okx.service'
import { ExternalWsGatewayService } from 'src/websockets/ws.service'
import { TelegramService } from 'src/telegram/telegram.service'

@Module({
  controllers: [OKXController],
  providers: [OKXService, ExternalWsGatewayService, TelegramService],
})
export class OKXModule {}
