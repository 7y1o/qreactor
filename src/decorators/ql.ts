/** GQL controller decorator */
export const QLController = (schemaPath: string, opts?: { path?: string; graphiql?: boolean }): ClassDecorator => {
  const path = opts?.path;
  const graphiql = opts?.graphiql;

  return (target: any) => {
    Reflect.defineMetadata(
      'ql-info',
      {
        schema: schemaPath,
        graphiql: graphiql ?? false,
        path: path ?? '/',
      },
      target,
    );

    if (!Reflect.hasMetadata('ql-resolvers', target)) {
      Reflect.defineMetadata('ql-resolvers', [], target);
    }
  };
};

/** GQL resolver decorator */
export const QLResolve: MethodDecorator = (target: any, pk: string | symbol) => {
  if (!Reflect.hasMetadata('ql-resolvers', target.constructor)) {
    Reflect.defineMetadata('ql-resolvers', [], target.constructor);
  }

  const resolvers = Reflect.getMetadata('ql-resolvers', target.constructor) as string[];
  resolvers.push(pk as string);
  Reflect.defineMetadata('ql-resolvers', resolvers, target.constructor);
};
