import type { IExpressRoute } from '../interfaces/QReactor';

/** Controller decorator */
export const Controller = (prefix: string = ''): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('prefix', prefix, target);

    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
  };
};

/** Route GET decorator */
export const Get = (path: string): MethodDecorator => {
  return (target: any, pk: string | symbol): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as IExpressRoute[];
    routes.push({
      method: 'get',
      path,
      name: pk as string,
      mws: [],
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

/** Route POST decorator */
export const Post = (path: string): MethodDecorator => {
  return (target: any, pk: string | symbol): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as IExpressRoute[];
    routes.push({
      method: 'post',
      path,
      name: pk as string,
      mws: [],
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

/** Route DELETE decorator */
export const Delete = (path: string): MethodDecorator => {
  return (target: any, pk: string | symbol): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as IExpressRoute[];
    routes.push({
      method: 'delete',
      path,
      name: pk as string,
      mws: [],
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

/** Route OPTIONS decorator */
export const Options = (path: string): MethodDecorator => {
  return (target: any, pk: string | symbol): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as IExpressRoute[];
    routes.push({
      method: 'options',
      path,
      name: pk as string,
      mws: [],
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

/** Route PUT decorator */
export const Put = (path: string): MethodDecorator => {
  return (target: any, pk: string | symbol): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as IExpressRoute[];
    routes.push({
      method: 'put',
      path,
      name: pk as string,
      mws: [],
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

/** Middleware decorator */
export const Middleware = (middleware: IExpressRoute['mws'][number]): MethodDecorator => {
  return (target: any, pk: string | symbol): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as IExpressRoute[];
    routes.find((r) => r.name === (pk as string))?.mws.push(middleware);
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};
