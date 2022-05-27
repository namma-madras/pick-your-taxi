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
exports.redisInstance = void 0;
const redis_1 = require("redis");
const application_logger_1 = __importDefault(require("../logger/application-logger"));
class RedisCache {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = (0, redis_1.createClient)({
                password: process.env.REDIS_PASSWORD,
                url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
            });
            this.client.on('error', this.onError);
            yield this.client.connect();
            application_logger_1.default.logInfo(`🔥[REDIS]: connected at PORT: ${process.env.REDIS_PORT}`);
        });
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client;
        });
    }
    onError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Redis client error", error);
        });
    }
}
exports.redisInstance = new RedisCache();
exports.default = exports.redisInstance.getClient();
