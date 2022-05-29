import { NextFunction, Request, Response } from "express";
import applicationLogger from "../logger/application-logger";

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (req.xhr) {
    applicationLogger.logError(err);
    res.status(500).send({ error: 'Internal Application Error.' });
    return;
  }
  console.log(err)
  applicationLogger.logError(err)
  res.status(500);
  res.json({ error: "Internal Server Error." });  
  return;
}

export default errorHandlerMiddleware;