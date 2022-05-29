"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestStart = (req, res, next) => {
    res.locals.startEpoch = Date.now();
    next();
};
exports.default = requestStart;
