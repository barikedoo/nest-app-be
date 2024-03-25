import { Injectable } from '@nestjs/common'
import { WebSocketGateway, OnGatewayInit } from '@nestjs/websockets'
import * as WebSocket from 'ws'

interface IWsParams {
  url: string
  extendConnectionInterval?: number
  onMessage: (data: any) => void
  onConnected: () => void
  onDisconnected: () => void
}
@Injectable()
@WebSocketGateway()
export class ExternalWsGatewayService implements OnGatewayInit {
  private ws: WebSocket
  private url: string
  private onMessage: (data) => void
  private onConnected: () => void
  private onDisconnected: () => void

  configure(params: IWsParams) {
    this.url = params.url
    this.onMessage = params.onMessage
    this.onConnected = params.onConnected
    this.onDisconnected = params.onDisconnected
    this.ws = new WebSocket(this.url)

    this.ws.on('open', () => {
      this.onConnected()
    })

    this.ws.on('message', (data) => {
      this.onMessage(data)
    })

    this.ws.on('close', () => {
      this.onDisconnected()
    })
  }

  send(payload) {
    this.ws.send(payload)
  }

  afterInit() {}
}
