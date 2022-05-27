"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
class Logger {
    constructor(loggerConfiguration) {
        this.logger = winston_1.default.createLogger({
            format: winston_1.default.format.json(),
            defaultMeta: loggerConfiguration.metaData,
            transports: [
                new winston_1.default.transports.File({
                    filename: `./src/log/${loggerConfiguration.filename}`,
                })
            ]
        });
    }
    dateTime() {
        const current_datetime = new Date();
        const formatted_date = current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1) +
            "-" +
            current_datetime.getDate() +
            " " +
            current_datetime.getHours() +
            ":" +
            current_datetime.getMinutes() +
            ":" +
            current_datetime.getSeconds();
        return formatted_date;
    }
    log({ level, message, metaData = {} }) {
        const dataToLog = Object.assign(Object.assign({}, metaData), { level: level, datetime: this.dateTime(), message: message });
        this.logger.log(dataToLog);
    }
}
exports.default = Logger;
