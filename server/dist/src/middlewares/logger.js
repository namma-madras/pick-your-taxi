"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_logger_1 = __importDefault(require("../logger/application-logger"));
const loggerMiddleware = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const statusCode = res.statusCode.toString();
    application_logger_1.default.logRequest({
        id: req.id,
        method: method,
        params: req.params,
        status: statusCode,
        url: url
    });
    next();
};
exports.default = loggerMiddleware;
