import express from 'express'
import { Request, Response } from 'express'
import { requestLogger } from './middlewares/logger'
import { errorHandler } from './middlewares/errorHandler'
import helloRouter from './routes/hello.routes'
import typeorm from 'typeorm'

const createApp = () => {
  const app = express()

  // 中间件
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(requestLogger)

  // 路由
  app.use('/', helloRouter)

  // 数据库健康检查路由（如果存在数据库配置）
  if (typeorm.getConnectionManager().connections.length > 0) {
    app.get('/db-health', async (req, res) => {
      try {
        await typeorm.getConnection().query('SELECT 1')
        res.json({ status: 'ok', db: 'connected' })
      } catch (err) {
        res.status(500).json({ status: 'error', db: 'disconnected' })
      }
    })
  }

  // 健康检查路由
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
  })

  // 错误处理中间件
  app.use(errorHandler)

  return app
}

export default createApp
