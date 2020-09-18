import promBundle from 'express-prom-bundle'
import { METRICS_PATH } from './config'

export const metricsMiddleware = promBundle({
    metricsPath: METRICS_PATH,
    promClient: { collectDefaultMetrics: {} }
});
