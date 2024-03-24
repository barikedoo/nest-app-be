import { ExternalWsGatewayService } from 'src/websockets/ws.service'
import { Injectable } from '@nestjs/common'
import okxSubscriptions from './okx.subscriptions'
import { TelegramService } from 'src/telegram/telegram.service'
import { formatWsMessage, checkIfMessagedShouldBeIgnored } from './okx.helpers'

@Injectable()
export class OKXService {
  constructor(
    public ws: ExternalWsGatewayService,
    private telegramService: TelegramService
  ) {
    this.ws.init({
      url: 'wss://ws.okx.com:8443/ws/v5/public',
      handlers: okxSubscriptions,
      onMessage: (data) => this.onMessage(data),
    })
  }

  onMessage(data) {
    if (checkIfMessagedShouldBeIgnored(data.toString())) {
      return
    }

    this.telegramService.broadcastMessage(formatWsMessage(data.toString()))
  }
}
