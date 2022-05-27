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
const redis_cache_1 = require("./src/services/redis-cache");
const logger_1 = __importDefault(require("./src/middlewares/logger"));
const application_logger_1 = __importDefault(require("./src/logger/application-logger"));
const requestId_1 = __importDefault(require("./src/middlewares/requestId"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, requestId_1.default)());
app.use(logger_1.default);
const port = process.env.API_SERVER_PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_cache_1.redisInstance.connect();
    application_logger_1.default.logInfo(`⚡️[API]: started at PORT:${port}`);
}));
