import { Request, Response, NextFunction } from "express"

const requestStart = (req: Request, res: Response, next: NextFunction) => {
  res.locals.startEpoch = Date.now()
  next()
}

export default requestStart;