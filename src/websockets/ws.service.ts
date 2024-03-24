import { Injectable } from '@nestjs/common'
import { WebSocketGateway, OnGatewayInit } from '@nestjs/websockets'
import * as WebSocket from 'ws'

interface IWsParams {
  url: string
  extendConnectionInterval?: number
  handlers?: {
    [eventName: string]: (data: any) => void
  }
}
@Injectable()
@WebSocketGateway()
export class ExternalWsGatewayService implements OnGatewayInit {
  private ws: WebSocket
  private url: string
  private extendConnectionInterval: number = 25000 // in ms
  private handlers: Record<string, (data) => void> = {}
  private extendConnectionTimer: NodeJS.Timeout

  init(params: IWsParams) {
    this.url = params.url
    this.handlers = params.handlers

    console.log('WS after init')
    this.ws = new WebSocket(this.url)

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
      console.log('Received data:', data.toString())
      // Handle the ticker information here
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
