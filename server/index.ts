import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { redisInstance } from './src/services/redis-cache';
import loggerMiddleware from './src/middlewares/logger';
import applicationLogger from './src/logger/application-logger';
import requestID from './src/middlewares/requestId';

dotenv.config();
const app: Express = express();
app.use(requestID())
app.use(loggerMiddleware);
const port = process.env.API_SERVER_PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, async () => {
  // await redisInstance.connect()
  applicationLogger.logInfo(`⚡️[API]: started at PORT:${port}`);
});