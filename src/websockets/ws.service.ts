import { Injectable } from '@nestjs/common'
import { WebSocketGateway, OnGatewayInit } from '@nestjs/websockets'
import * as WebSocket from 'ws'

const WS_PING_INTERVAL = 25000
interface IWsParams {
  url: string
  extendConnectionInterval?: number
  handlers?: {
    [eventName: string]: (data: any) => void
  }
  onMessage?: (data: any) => void
}
@Injectable()
@WebSocketGateway()
export class ExternalWsGatewayService implements OnGatewayInit {
  private ws: WebSocket
  private url: string
  private onMessage: (data) => void
  private extendConnectionInterval: number // in ms
  private handlers: Record<string, (data) => void> = {}
  private extendConnectionTimer: NodeJS.Timeout

  init(params: IWsParams) {
    this.url = params.url
    this.handlers = params.handlers
    this.extendConnectionInterval =
      params.extendConnectionInterval || WS_PING_INTERVAL

    this.ws = new WebSocket(this.url)
    this.onMessage = params.onMessage

    for (const eventName in this.handlers) {
      this.ws.on(eventName, this.handlers[eventName])
    }

    this.ws.on('open', () => {
      console.log('Connected to WebSocket')

      for (const eventName in this.handlers) {
        this.ws.send(eventName)
      }

      this.keepConnectionAlive()
    })

    this.ws.on('message', (data) => {
      // Handle the ticker information here
      this.onMessage(data)
    })

    this.ws.on('close', () => {
      console.log('Disconnected from WebSocket')
      clearInterval(this.extendConnectionTimer)
    })
  }

  keepConnectionAlive() {
    this.extendConnectionTimer = setInterval(() => {
      this.ws.send('ping')
    }, this.extendConnectionInterval)
  }

  afterInit() {}
}
