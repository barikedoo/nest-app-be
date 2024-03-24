import * as LocalSession from 'telegraf-session-local'

export const sessions = new LocalSession<any>({
  database: './telegram_sessions_db.json',
})
