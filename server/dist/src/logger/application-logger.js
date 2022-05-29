"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
class ApplicationLogger extends logger_1.default {
    constructor() {
        super({
            filename: `${process.env.NODE_ENV}.log`,
            metaData: {
                service: 'application'
            }
        });
    }
    logToConsole(message) {
        console.log(`[${this.dateTime()}] ${message}`);
    }
    logInfo(message) {
        this.logToConsole(message);
        this.log({
            level: 'info',
            message: message
        });
    }
    logError(error) {
        this.logToConsole(error);
        this.log({
            level: 'error',
            message: error,
            metaData: error
        });
    }
    logRequest(requestOptions) {
        this.logToConsole(`[${requestOptions.id}] method:${requestOptions.method} params:${JSON.stringify(requestOptions.params)} url: ${requestOptions.url} status: ${requestOptions.status}`);
        this.log({
            level: 'info',
            message: `[${requestOptions.id}] Request`,
            metaData: requestOptions
        });
    }
}
exports.default = new ApplicationLogger();
