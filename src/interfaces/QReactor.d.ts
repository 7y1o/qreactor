import type { GraphQLSchema } from 'graphql';

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

/** QReactor routes */
export interface IQRRoute {
  schemas: GraphQLSchema;
  resolvers: {};
}
