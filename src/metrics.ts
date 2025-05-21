import { register } from 'prom-client';

export const metricsMiddleware = (req: any, res: any, next: any) => {
    register.metrics()
        .then(output => {
            res.send(output).end();
        })
        .catch(next);
};
