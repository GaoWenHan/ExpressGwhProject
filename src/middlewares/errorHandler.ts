import { Request, Response, NextFunction } from 'express'

interface ErrorWithStatus extends Error {
  status?: number
}

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${status}: ${message}`)
  
  res.status(status).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
}
