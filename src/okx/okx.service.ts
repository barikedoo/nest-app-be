import { ExternalWsGatewayService } from './../websockets/ws.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OKXService {
  constructor(public ws: ExternalWsGatewayService) {
    this.ws.init({
      url: 'wss://ws.okx.com:8443/ws/v5/public',
      handlers: {
        // Liquidations
        [JSON.stringify({
          op: 'subscribe',
          args: [
            {
              channel: 'liquidation-orders',
              instType: 'FUTURES',
            },
          ],
        })]: (data) => {
          console.log('Liquidation signal', data)
        },
        // [JSON.stringify({
        //   op: 'subscribe',
        //   args: [
        //     {
        //       channel: 'open-interest',
        //       instId: 'LTC-USD-SWAP',
        //     },
        //   ],
        // })]: (data) => {
        //   console.log('Open Interest signal', data)
        // },
      },
    })
  }
}
