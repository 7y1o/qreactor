import type { NextFunction, Request, Response } from 'express';
import QReactor, { Controller, Get, Middleware } from '../src';
import axios from 'axios';

// Creating sample middleware that setup the 'test-cookie'
const sampleMiddleWare = ({ session }: { session: Request['session'] & { counter: number } }, res: Response, next: NextFunction) => {
    session.counter = 1;
    session.save(() => next());
}

@Controller()
// @ts-ignore
class TestController {

    @Get('/')
    @Middleware(sampleMiddleWare as unknown as (req: Request, res: Response, next: NextFunction) => any)
    // @ts-ignore
    hwGet(_, res: Response) {
        res.send('<h1>Hello, World!</h1>');
    }
}

describe('Test server middlewares', () => {
    const server = new QReactor({ 
        port: 4003,
        session: {
            saveUninitialized: true,
            resave: true,
            name: 'test-cookie',
            secret: '123'
        }
    });

    test('Is routes can initialize', () => {
        expect(server.express(TestController)).toBeUndefined();
    });

    test('Can start', (done) => {
        server.start().then(v => {
            expect(v).toBeUndefined();
            done();
        });
    });

    test('GET route is accessible', (done) => {
        axios.get('http://localhost:4003/').then(r => {
            expect(r.data).toBe('<h1>Hello, World!</h1>');
            done();
        });
    });

    test('Middleware worked successfully', (done) => {
        axios.get('http://localhost:4003/').then(r => {
            const cookie = r?.headers?.['set-cookie']?.[0] ?? '';
            expect(cookie.includes('test-cookie')).toBeTruthy();
            done();
        });
    })

    test('Can stop', () => {
        expect(server.stop()).toBeUndefined();
    });
});