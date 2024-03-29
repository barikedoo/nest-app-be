import { ExternalWsGatewayService } from 'src/websockets/ws.service'
import { Injectable } from '@nestjs/common'
import okxSubscriptions from './okx.subscriptions'
import { TelegramService } from 'src/telegram/telegram.service'
import {
  formatWsMessage,
  checkIfMessagedShouldBeIgnored,
  toJson,
} from './okx.helpers'

const WS_PING_INTERVAL = 25000

@Injectable()
export class OKXService {
  private extendConnectionInterval: number // in ms
  private extendConnectionTimer: NodeJS.Timeout

  constructor(
    public ws: ExternalWsGatewayService,
    private telegramService: TelegramService
  ) {
    this.ws.configure({
      url: 'wss://ws.okx.com:8443/ws/v5/public',
      onMessage: (data) => this.onMessage(data),
      onConnected: () => this.onConnected(),
      onDisconnected: () => this.onDisconnected(),
    })

    this.extendConnectionInterval = WS_PING_INTERVAL
  }

  keepConnectionAlive() {
    this.extendConnectionTimer = setInterval(() => {
      this.ws.send('ping')
    }, this.extendConnectionInterval)
  }

  onConnected() {
    console.log('OKX Connected to WebSocket')

    for (const eventName in okxSubscriptions) {
      this.ws.send(eventName)
    }

    this.keepConnectionAlive()
  }

  onDisconnected() {
    console.log('OKX Disconnected from WebSocket')

    clearInterval(this.extendConnectionTimer)
  }

  onMessage(data: Buffer) {
    const jsonData = toJson(data.toString())

    if (checkIfMessagedShouldBeIgnored(jsonData)) return

    this.telegramService.broadcastMessage(formatWsMessage(jsonData))
  }
}
