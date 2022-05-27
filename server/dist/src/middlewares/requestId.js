"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function generateV4UUID(_request) {
    return (0, uuid_1.v4)();
}
const ATTRIBUTE_NAME = 'id';
function requestID({ generator = generateV4UUID, headerName = 'X-Request-Id', setHeader = true, } = {}) {
    return function (request, response, next) {
        const oldValue = request.get(headerName);
        const id = oldValue === undefined ? generator(request) : oldValue;
        if (setHeader) {
            response.set(headerName, id);
        }
        request[ATTRIBUTE_NAME] = id;
        next();
    };
}
exports.default = requestID;
