# QReactor
GraphQL server built on top of ExpressJS with support for Cookies, CORS and other useful stuff

[![Common job](https://github.com/7y1o/qreactor/actions/workflows/main.yml/badge.svg)](https://github.com/7y1o/qreactor/actions/workflows/main.yml)

## What is QReactor?
QReactor is a library that combines the capabilities of ExpressJS and GraphQL. With the help of decorators, you can configure separate Express controllers and separate ones for GraphQL.

Cookies and CORS are already included in the "configuration" of the server. You can also add your middleware using the `use` method, as in Express.

## How to start?

### GraphQL example
Here is an example of how to run a small server with GraphQL:

```graphql
# user.gql

type Query {
    searchUser(name: String!): UserSearchResponse!
}

type User {
    id: ID!,
    name: String!,
    online: Boolean!
}

type UserSearchResponse {
    result: User,
    error: String
}

```

```typescript
// controller.ts (for example)
import { QLController, QLResolve } from '@7y1o/qreactor';

// Creating a new class with resolvers:

@QLController('src/schemas/user.gql', { path: '/api/user' })
class UserController {

    @QLResolve
    searchUser({name}, {req}) {
        if (!req.cookies['x-access-token']) return {
            error: 'err_no_token'
        };

        // ... some search ...

        return { user };
    }
}
export default UserController;
```

```typescript
// main.ts
import QReactor from '@7y1o/qreactor';
import UserController from './controller';

const server = new QReactor({
    port: 7910
});

// Now we need to register our controller
server.ql(UserController);  // In this method, you can specify 
                            //multiple controllers separated by commas

server.start();
```

### Basic Express example

```typescript
// controller.ts
import {Controller, Get, Post} from '@7y1o/qreactor';

@Controller('/hello') // you can leave empty brackets here
class GreetsController {

    @Get('/')
    basicGreets(_, res) {
        return res.send('<h1>Hello! Glad to see you!</h1>');
    }

    @Post('/:name')
    sendGreets(req, res) {
        return res.send(`<h1>Hello, ${req.params.name}! Glad to see you!</h1>`);
    }
}
export default GreetsController;
```

```typescript
// main.ts
import QReactor from '@7y1o/qreactor';
import GreetsController from './controller';

const server = new QReactor({
    cors: {
        origin: '*'
    }
});

server.express(GreetsController);
server.start();
```

### Middleware example

```typescript
// controller.ts
import {Controller, Post, Middleware} from '@7y1o/qreactor';

const testMiddle = (req, res, next) => {
    res.send('sent from middleware');
    next();
}

@Controller()
class IdentityController {

    // IMPORTANT! Write @Middleware over method decorator
    @Middleware(testMiddle)
    @Post('/signin')
    signIn(req, res) {
        req.session.name = req.body.name;
        req.session.save(() => res.send('Hello, ' + req.session.name)); 
    }

}

export default IdentityController;
```

```typescript
// main.ts
import QReactor from '@7y1o/qreactor';
import IdentityController from './controller';

const server = new QReactor({
    session: {
        secret: 'verysecretcode',
        name: 'access-token'
    }
});

server.express(IdentityController);
server.start();
```

## TODO:

### New features:
- [ ] — Add `@Middleware` decorator for using middlewares
- [ ] — Add databases support
- [ ] — Add GraphQL schema generator with decorators
- [ ] — Add async preinitialize function for other libraries preparation (like mongoose or sqlite)
- [ ] — Add log for debug and errors
- [ ] — Make more strong types support
- [ ] — Add request fields validator

### Bugfixes and similar things:
- [ ] — Optimize methods
- [ ] — Add more tests for better library stability
- [ ] — Fix the types of the GraphiQL field (in @QLController) for its correct operation
- [ ] — Fix some bugs with queries and mutations

### Other:
_nothing is here_

## Ready:
- [x] — Express server
- [x] — Express controllers
- [x] — GralhQL controllers
- [x] — Middleware decorator for express controller

Full change log you can see on [this page](./CHANGELOG.md)