import { Request, Response } from 'express';

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
}

/** QReactor config */
export interface IQRConfig {
  port: number,
  cors: boolean | IQRInitConfig['cors'],
}

/** QReactor GraphQL routes */
export interface IQLRoute {
  schema: string;
  resolvers: {
    [resolver: string]: (req: Request, res: Response) => any 
  }
}

/** QReactor Express routes */
export interface IExpressRoute {

  /** Path to the handling route */
  path: string,

  /** Name of the route */
  name: string,

  /** Handling method */
  method: 'get' | 'post' | 'delete' | 'options' | 'put'
}

/** Fake class type implementation */
export type Class = {
  new(...args: any[]): any;
  [key: string]: any
};