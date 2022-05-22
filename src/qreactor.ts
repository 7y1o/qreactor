import express from 'express';
import qrDefConfig from './utils/def-config';

// Types
import type { Server } from 'http';
import type { Express, NextFunction, Request, Response } from 'express';
import type { IQRInitConfig, IQLRoute, IQRConfig, Class, IExpressRoute } from './interfaces/QReactor';

/** QReactor common class */
export default class QReactor {
    private server: Express;
    private running?: Server;
    private config: IQRConfig;

    /** Initialize */
    public constructor(options?: IQRInitConfig) {
        this.server = express();
        this.config = Object.assign({}, qrDefConfig, options ?? {});
    }

    /** Initialize QL */
    public ql(...qlRoutes: IQLRoute[]): void {
        if (this.running) throw new Error('Cannot init GraphQL after server start');
    }
    
    /** Register Express controllers */
    public express(...controllers: Class[]): void {
        controllers.forEach((controller: Class) => {
            const instance = new controller();
            const prefix = Reflect.getMetadata('prefix', controller);
            const routes: Array<IExpressRoute> = Reflect.getMetadata('routes', controller);
            routes.forEach((route) => {
                this.server[route.method](prefix + route.path, (req: Request, res: Response, next: NextFunction) => {
                    instance[route.name](req, res, next);
                });
            });
        });
    }

    /** Start the server */
    public start(cb?: () => void): void {
        this.running = this.server.listen(
            this.config.port,
            () => {
                if (cb) {
                    return cb();
                }

                const fmt = Intl.DateTimeFormat('en', {
                    dateStyle: 'short',
                    hour12: false
                });
                console.log(`🚀 [${fmt.format(Date.now())}] QReactor server started: http://localhost:${this.config.port}`);
            }
        );
    }

    /** Stop the server */
    public stop(): void {
        if (!this.running) throw new Error('Trying to stop server before it started');
        this.running.close();
    }
}
