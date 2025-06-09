import { Request, Response, NextFunction } from 'express'
import chalk from 'chalk'

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now()
  const { method, originalUrl } = req

  res.on('finish', () => {
    const duration = Date.now() - start
    const statusColor = 
      res.statusCode >= 500 ? chalk.red :
      res.statusCode >= 400 ? chalk.yellow :
      res.statusCode >= 300 ? chalk.blue :
      chalk.green

    const timestamp = chalk.gray(`[${new Date().toISOString()}]`)
    let methodColor = chalk.white
    if (method === 'GET') methodColor = chalk.blue
    else if (method === 'POST') methodColor = chalk.green
    else if (method === 'PUT') methodColor = chalk.yellow
    else if (method === 'DELETE') methodColor = chalk.red
    
    const methodColored = chalk.bold(methodColor(method))
    console.log(
      `${timestamp} ${methodColored} ${originalUrl} - ${statusColor(res.statusCode)} ${chalk.gray(`(${duration}ms)`)}`
    )
  })

  next()
}
