"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prometheus = require('prom-client');
class ApplicationMonitor {
    constructor() {
        this.requestHistogram = new Prometheus.Histogram({
            name: 'http_request_duration_ms',
            help: 'Duration of HTTP requests in ms',
            labelNames: ['method', 'route', 'code'],
            buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 2500, 3000] // buckets for response time from 0.1ms to 500ms
        });
    }
    getDefaultMetricsResponse() {
        console.log(Prometheus.register.contentType);
        return {
            'Content-Type': Prometheus.register.contentType,
            'metrics': Prometheus.register.metrics()
        };
    }
    getRequestHistogram() {
        return this.requestHistogram;
    }
}
exports.default = new ApplicationMonitor();
