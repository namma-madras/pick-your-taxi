"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monitorMiddleware = (req, res, next) => {
    httpRequestDurationMicroseconds
        .labels(req.method, req.route.path, res.statusCode)
        .observe(responseTimeInMs);
    next();
};
