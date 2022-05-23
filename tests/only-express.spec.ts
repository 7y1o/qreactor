import type { Request, Response } from 'express';
import QReactor, { Controller, Get, Post } from '../src/index';
import axios from 'axios';

@Controller()
// @ts-ignore
class ExampleController {

    @Get('/')
    // @ts-ignore
    hwGet(_: Request, res: Response) {
        res.send('<h1>Hello, World!</h1>')
    }

    @Post('/')
    // @ts-ignore
    hwPost(_: Request, res: Response) {
        res.json({
            message: 'Hello, World!'
        });
    }
}

describe('Test server Express routes', () => {
    const server = new QReactor({
        port: 4001
    });

    test('Is routes can initialize', () => {
        expect(new Promise<void>(r => {server.express(ExampleController);r()})).resolves.not.toThrowError();
    });

    test('Can start', () => {
        expect(new Promise<void>(r => {server.start();r()})).resolves.not.toThrowError();
    });

    test('GET route is accessible', (done) => {
        axios.get('http://localhost:4001/').then((r) => {
            expect(r.data).toBe('<h1>Hello, World!</h1>');
            done();
        });
    });

    test('POST route is accessible', (done) => {
        axios.post('http://localhost:4001/').then((r) => {
            expect((r.data as {message: string}).message).toBe('Hello, World!');
            done();
        });
    });

    test('Can stop', () => {
        expect(server.stop()).toBe(undefined);
    });
});