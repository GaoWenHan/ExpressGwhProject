import express from 'express'
import { requestLogger } from './middlewares/logger'
import { errorHandler } from './middlewares/errorHandler'
import userRouter from './routes/user.routes'

const createApp = () => {
  const app = express()

  // 中间件
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(requestLogger)

  // 路由
  app.use('/api', userRouter)

  // 健康检查路由
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // 错误处理中间件
  app.use(errorHandler)

  return app
}

export default createApp
