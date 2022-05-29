"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_logger_1 = __importDefault(require("../logger/application-logger"));
const errorHandlerMiddleware = (err, req, res, next) => {
    if (req.xhr) {
        application_logger_1.default.logError(err);
        res.status(500).send({ error: 'Internal Application Error.' });
        return;
    }
    console.log(err);
    application_logger_1.default.logError(err);
    res.status(500);
    res.json({ error: "Internal Server Error." });
    return;
};
exports.default = errorHandlerMiddleware;
