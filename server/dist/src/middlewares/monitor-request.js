"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_monitor_1 = __importDefault(require("../core/application-monitor"));
const monitorRequest = (req, res, next) => {
    const responseTimeInMs = Date.now() - res.locals.startEpoch;
    application_monitor_1.default.getRequestHistogram()
        .labels(req.method, req.path, res.statusCode)
        .observe(responseTimeInMs);
    next();
};
exports.default = monitorRequest;
