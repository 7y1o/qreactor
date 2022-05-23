# QReactor
GraphQL server built on top of ExpressJS with support for Cookies, CORS and other useful stuff

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
