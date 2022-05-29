import express from 'express';
import session from 'express-session';
import cors from 'cors';
import qrDefConfig from './utils/def-config';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { readFileSync } from 'fs';

// Types
import type { Server } from 'http';
import type { CorsOptions } from 'cors';
import type { Express, NextFunction, Request, Response } from 'express';
import type { IQRInitConfig, IQRConfig, Class, IExpressRoute } from './interfaces/QReactor';

/** QReactor common class */
export default class QReactor {
  private server: Express;
  private running?: Server;
  private config: IQRConfig;
  private prepars: (() => any)[];

  /** Initialize */
  public constructor(options?: IQRInitConfig) {
    this.server = express();
    this.config = Object.assign({}, qrDefConfig, options ?? {});
    this.prepars = [];

    // Setup cookie middleware
    this.server.use(session(this.config.session as session.SessionOptions));

    // Setup CORS
    this.server.use(cors(this.config.cors as CorsOptions));
  }

  public async prepare(pf: () => any): Promise<void> {
    this.prepars.push(pf);
  }

  /** Register QL controllers */
  public ql(...controllers: Class[]): void {
    if (this.running) throw new Error('Cannot init GraphQL after server start');
    controllers.forEach((controller: Class) => {
      const instance = new controller();
      const meta = Reflect.getMetadata('ql-info', controller);
      const resolvers = Reflect.getMetadata('ql-resolvers', controller) as string[];

      const schema = buildSchema(readFileSync(meta.schema).toString());
      const ql = graphqlHTTP({
        schema,
        rootValue: Object.assign({}, ...resolvers.map((name) => ({ [name]: instance[name] }))),
        graphiql: meta.graphiql,
      });

      this.server.all(meta.path, ql);
    });
  }

  /** Register Express controllers */
  public express(...controllers: Class[]): void {
    controllers.forEach((controller: Class) => {
      const instance = new controller();
      const prefix = Reflect.getMetadata('prefix', controller);
      const routes: IExpressRoute[] = Reflect.getMetadata('routes', controller);
      routes.forEach((route) => {
        console.log(
          'Creating', 
          route.method.toUpperCase(), 
          'method',
          route.mws.length > 0 ? 'with' : 'without',
          'middlewares' + (route.mws.length > 0 ? ':' : ''),
          route.mws.length > 0 ? route.mws.map((e) => e.name).join(', ') : ''
        );

        if (route.mws.length > 0)
          this.server[route.method](
            prefix + route.path,
            [...route.mws],
            async (req: Request, res: Response, next: NextFunction) => {
              await instance[route.name](req, res, next);
            },
          );
        else
          this.server[route.method](prefix + route.path, (req: Request, res: Response, next: NextFunction) => {
            instance[route.name](req, res, next);
          });
      });
    });
  }

  /** Add middleware */
  public use(middleware: (req: Request, res: Response, next: NextFunction) => any): void {
    this.server.use(middleware);
  }

  /** Start the server */
  public async start(cb?: () => void): Promise<void> {
    for (const p of this.prepars) {
      await p();
    }
    
    this.running = this.server.listen(this.config.port, () => {
      if (cb) cb();
    });
  }

  /** Stop the server */
  public stop(): void {
    if (!this.running) throw new Error('Trying to stop server before it started');
    this.running.close();
  }
}
