import express from 'express';

// Types
import type { Express } from 'express';
import type { IQRInitConfig, IQRRoute } from './interfaces/QReactor';

/** QReactor common class */
export default class QReactor {
  private server: Express;
  private resolvers: IQRRoute[];

  /** Initialize */
  public constructor(options?: IQRInitConfig) {
    this.server = express();
    this.resolvers = [];
  }
}
