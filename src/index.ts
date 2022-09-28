import 'reflect-metadata';

// Import classes and methods
import QReactor from './qreactor';
import { Controller, Get, Delete, Options, Post, Put, Middleware } from './decorators/express';
import { QLController, QLResolve } from './decorators/ql';

// Import types
import type { Request, Response } from 'express';
import type { IQRInitConfig, IExpressRoute, IContext } from './interfaces/QReactor';

// Export
export {
  // Classes & methods
  QReactor as default,
  Controller,
  Get,
  Delete,
  Options,
  Post,
  Put,
  Middleware,
  QLController,
  QLResolve,
  // Types
  IQRInitConfig,
  IExpressRoute,
  IContext,
  Request,
  Response,
};
