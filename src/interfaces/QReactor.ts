import type { Request, Response, NextFunction } from 'express';
import { IncomingMessage } from 'http';

/** Initialization options */
export interface IQRInitConfig {
  port?: number;
  cors?:
    | boolean
    | string
    | {
        maxAge?: number;
        origin?: string | string[] | RegExp;
        methods?: string[];
        credentials?: boolean;
        allowedHeaders?: string[];
        exposedHeaders?: string[];
        preflightContinue?: boolean;
        optionsSuccessStatus?: number;
      };
  session?: {
    secret: string | string[];
    cookie?: {
      path?: string;
      maxAge?: number;
      domain?: string;
      secure?: boolean;
      signed?: boolean;
      encode?: (val: string) => string;
      httpOnly?: boolean;
      sameSite?: 'none' | 'lax' | 'strict';
    };
    name?: string;
    genId?: (req: Request) => string;
    proxy?: boolean;
    resave?: boolean;
    rolling?: boolean;
    saveUninitialized?: boolean;
  };
}

/** QReactor config */
export interface IQRConfig {
  port: number;
  cors: boolean | IQRInitConfig['cors'];
  session?: IQRInitConfig['session'];
}

/** QReactor Express routes */
export interface IExpressRoute {
  /** Path to the handling route */
  path: string;

  /** Name of the route */
  name: string;

  /** Handling method */
  method: 'get' | 'post' | 'delete' | 'options' | 'put';

  /** Middlewares */
  mws: ((request: Request, response: Response, next: NextFunction) => any)[];
}

/** Fake class type implementation */
export type Class = {
  new (...args: any[]): any;
  [key: string]: any;
};

/** Context type implementation */
export interface IContext extends IncomingMessage {
  req: Request;
  res: Response;
}
