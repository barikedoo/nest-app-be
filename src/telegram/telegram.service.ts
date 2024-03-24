import { Context, Telegraf } from 'telegraf'
import { InjectBot, Start, Update } from 'nestjs-telegraf'
import { Public } from 'src/auth/decorators/public.decorator'
import { sessions } from './telegram.sessions'
import { Injectable } from '@nestjs/common'

@Injectable()
@Update()
export class TelegramService {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Public()
  @Start()
  async startCommad(ctx: Context) {
    await ctx.reply('Hello there. You chat ID: ' + ctx.message.chat.id)
  }

  async sendMessage(chatId: string, message: string): Promise<void> {
    if (!message || !chatId) return

    await this.bot.telegram.sendMessage(chatId, message).catch((error) => {
      console.error(`Failed to send message to ${chatId}`, error)
    })
  }

  getAllActiveSessions() {
    return (sessions.DB as any)
      .get('sessions')
      .value()
      .map(({ id }) => id.split(':')[0])
  }

  async broadcastMessage(message: string): Promise<void> {
    const activeSessions = this.getAllActiveSessions()

    activeSessions.forEach((chatId) => {
      this.sendMessage(chatId, message)
    })
  }
}
