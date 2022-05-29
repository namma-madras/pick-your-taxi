"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_monitor_1 = __importDefault(require("../core/application-monitor"));
const router_1 = __importDefault(require("../core/router"));
router_1.default.get('/metrics', (req, res) => {
    const response = application_monitor_1.default.getDefaultMetricsResponse();
    console.log(response);
    res.set('Content-Type', response['Content-Type']);
    res.send(response.metrics);
});
exports.default = router_1.default;
