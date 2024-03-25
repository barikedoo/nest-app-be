import { Module } from '@nestjs/common'
import { BinanceService } from './binance.service'
import { TelegramService } from 'src/telegram/telegram.service'
import { ExternalWsGatewayService } from 'src/websockets/ws.service'

@Module({
  providers: [BinanceService, TelegramService, ExternalWsGatewayService],
})
export class BinanceModule {}
