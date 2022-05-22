import 'reflect-metadata';

// Import classes and methods
import QReactor from './qreactor';
import { Controller, Get, Delete, Options, Post, Put } from './decorators/express';

// Import types
import type { IQRInitConfig, IQLRoute, IExpressRoute } from './interfaces/QReactor';

// Export
export {
    
    // Classes & methods
    QReactor as default,
    Controller, Get, Delete, Options, Post, Put,
    
    // Types
    IQRInitConfig, IQLRoute, IExpressRoute
};
