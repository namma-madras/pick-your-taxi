import { Response } from "express";
import applicationLogger from "../logger/application-logger";

const loggerMiddleware = (req: any, res: Response, next: any) => {
  const method = req.method;
  const url = req.url;
  const statusCode = res.statusCode.toString();
  applicationLogger.logRequest({
    id: req.id,
    method: method,
    params: req.params,
    status: statusCode,
    url: url
  })
  next();
};

export default loggerMiddleware;