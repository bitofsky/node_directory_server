import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

import { SERV_ADDR, SERV_PORT, METRICS_PORT, METRICS_PATH, ALL_PATHS } from './config';
import { SIGTERM, WARN, INFO } from './util';
import { metricsMiddleware } from './metrics';

export function createExpress(port: string, addr: string): Promise<Express> {

    return new Promise((resolve, reject) => {

        const app = express();

        app.use(helmet());

        const server = app.listen(+port, addr, () => resolve(app));

        server.on('error', reject);

        SIGTERM(() => server.close());

        // All other accesses return status 500 error
        app.use('*', (req, res, next) => {
            if (req.method === 'GET' && ALL_PATHS.includes(req.originalUrl))
                return next();
            res.status(500);
            res.end();
        });

        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            res.status(500);
            res.end();
            req.destroy();
        });

    });


}

export async function start() {

    const app = await createExpress(SERV_PORT, SERV_ADDR);

    if (METRICS_PATH) {

        const metricsApp = SERV_PORT === METRICS_PORT ? app : await createExpress(METRICS_PORT, SERV_ADDR);

        WARN(`METRICS_PATH = http://${SERV_ADDR}:${METRICS_PORT}${METRICS_PATH}`);

        metricsApp.use(metricsMiddleware);

    }

    return app;

}
