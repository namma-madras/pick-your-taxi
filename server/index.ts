import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { redisInstance } from './src/services/redis-cache';
import loggerMiddleware from './src/middlewares/logger';
import applicationLogger from './src/logger/application-logger';
import requestID from './src/middlewares/requestId';
import errorHandlerMiddleware from './src/middlewares/errorHandler';
import requestStart from './src/middlewares/requestStart';

const Prometheus = require('prom-client');
const requestHistogram = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
})
const metricsInterval = Prometheus.collectDefaultMetrics()

dotenv.config();
const app: Express = express();

// register middlewares
app.use(requestStart)
app.use(requestID())
app.use(loggerMiddleware);
app.use((req: Request, res: Response, next: NextFunction) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch
    requestHistogram.labels(req.method, req.path, res.statusCode)
    .observe(responseTimeInMs)
  next()
})
app.use(errorHandlerMiddleware);

app.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', Prometheus.register.contentType)
  res.send(await Prometheus.register.metrics())
})

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server edited now');
});

const server = app.listen(process.env.API_SERVER_PORT, async () => {
  // await redisInstance.connect()
  applicationLogger.logInfo(`⚡️[API]: started at PORT:${process.env.API_SERVER_PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  clearInterval(metricsInterval)
  server.close((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
})
