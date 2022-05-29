"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./src/middlewares/logger"));
const application_logger_1 = __importDefault(require("./src/logger/application-logger"));
const requestId_1 = __importDefault(require("./src/middlewares/requestId"));
const errorHandler_1 = __importDefault(require("./src/middlewares/errorHandler"));
const requestStart_1 = __importDefault(require("./src/middlewares/requestStart"));
const Prometheus = require('prom-client');
const requestHistogram = new Prometheus.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500] // buckets for response time from 0.1ms to 500ms
});
const metricsInterval = Prometheus.collectDefaultMetrics();
dotenv_1.default.config();
const app = (0, express_1.default)();
// register middlewares
app.use(requestStart_1.default);
app.use((0, requestId_1.default)());
app.use(logger_1.default);
app.use((req, res, next) => {
    const responseTimeInMs = Date.now() - res.locals.startEpoch;
    requestHistogram.labels(req.method, req.path, res.statusCode)
        .observe(responseTimeInMs);
    next();
});
app.use(errorHandler_1.default);
app.get('/metrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Content-Type', Prometheus.register.contentType);
    res.send(yield Prometheus.register.metrics());
}));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
const server = app.listen(process.env.API_SERVER_PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    // await redisInstance.connect()
    application_logger_1.default.logInfo(`⚡️[API]: started at PORT:${process.env.API_SERVER_PORT}`);
}));
// Graceful shutdown
process.on('SIGTERM', () => {
    clearInterval(metricsInterval);
    server.close((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        process.exit(0);
    });
});
