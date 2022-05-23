import 'reflect-metadata';

// Import classes and methods
import QReactor from './qreactor';
import { Controller, Get, Delete, Options, Post, Put } from './decorators/express';
import { QLController, QLResolve } from './decorators/ql';

// Import types
import type { IQRInitConfig, IExpressRoute } from './interfaces/QReactor';

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
  QLController,
  QLResolve,
  // Types
  IQRInitConfig,
  IExpressRoute,
};
