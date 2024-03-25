import { ExternalWsGatewayService } from 'src/websockets/ws.service'
import { Injectable } from '@nestjs/common'
import { TelegramService } from 'src/telegram/telegram.service'
import {
  formatWsMessage,
  checkIfMessagedShouldBeIgnored,
  toJson,
} from './binance.helpers'

@Injectable()
export class BinanceService {
  constructor(
    public ws: ExternalWsGatewayService,
    private telegramService: TelegramService
  ) {
    this.ws.configure({
      url: 'wss://fstream.binance.com/ws',
      onMessage: (data) => this.onMessage(data),
      onConnected: () => this.onConnected(),
      onDisconnected: () => this.onDisconnected(),
    })
  }

  onConnected() {
    console.log('Binance Connected to WebSocket')

    this.ws.send(
      JSON.stringify({
        method: 'SUBSCRIBE',
        params: ['!forceOrder@arr'],
        id: Date.now(),
      })
    )
  }

  onDisconnected() {
    console.log('Binance Disconnected from WebSocket')
  }

  onMessage(data) {
    const jsonData = toJson(data.toString())

    if (checkIfMessagedShouldBeIgnored(jsonData)) return

    this.telegramService.broadcastMessage(formatWsMessage(jsonData))
  }
}
