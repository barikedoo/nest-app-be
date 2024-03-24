import { OKXService } from './okx.service'
import { Controller } from '@nestjs/common'

@Controller('api/okx')
export class OKXController {
  constructor(private okxService: OKXService) {}

  // @Post('/liquidations/subscribe')
  // subscribeToLiquidations() {
  // this.okxService.ws.
  // }

  // @Get(':id')
  // getById(@Param('id') id) {
  //   return this.okxService.getById({ id: parseInt(id) })
  // }
}
