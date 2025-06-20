import chalk from 'chalk'
import { showBanner } from './utils/banner'
import createApp from './app'

const port = 3000

// 显示启动banner
showBanner()

// 启动应用
const app = createApp()
app.listen(port, () => {
  console.log(chalk.yellow(`\n  Server running at: ${chalk.underline(`http://localhost:${port}`)}`))
  console.log(chalk.blue('  Press CTRL-C to stop\n'))
})
