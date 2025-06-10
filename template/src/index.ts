import 'reflect-metadata'
import 'dotenv/config'
import chalk from 'chalk'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
import { initializeDB } from './config/database'
import { showBanner } from './utils/banner'
import createApp from './app'

const port = 3000

// 显示启动banner
showBanner()

// 初始化数据库并启动应用
initializeDB()
  .then(() => {
    const app = createApp()
    console.log(chalk.green('✓ Database connected successfully'))
    app.listen(port, () => {
      console.log(chalk.yellow(`\n  Server running at: ${chalk.underline(`http://localhost:${port}`)}`))
      console.log(chalk.blue('  Press CTRL-C to stop\n'))
    })
  })
  .catch(err => {
    console.error(chalk.red('✗ Database connection failed:'))
    console.error(chalk.red(err))
    process.exit(1)
  })
