import { DataSource } from 'typeorm'
import 'reflect-metadata'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'express_app',
  entities: [__dirname + '/../models/*.ts'],
  synchronize: true,
  logging: ["error", "warn"],
  logger: "simple-console",
  extra: {
    connectTimeout: 30000,
    waitForConnections: true,
    queueLimit: 0
  },
  poolSize: 10,
  migrationsRun: false,
  dropSchema: false
})

export const initializeDB = async () => {
  try {
    const connection = await AppDataSource.initialize()
    return connection
  } catch (error) {
    if (error instanceof Error) {
      console.error('Stack trace:', error.stack)
    }
    throw error
  }
}

export default AppDataSource
