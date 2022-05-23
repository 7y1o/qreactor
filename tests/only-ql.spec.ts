import QReactor, { QLController, QLResolve } from "../src";
import axios from 'axios';
import path from "path";
import http from 'http';
import fs from 'fs';

@QLController(path.resolve(process.cwd(), 'tests', 'schema', 'test.gql'), { path: '/', graphiql: true })
// @ts-ignore
class ExampleQLController {

    @QLResolve
    // @ts-ignore
    hello() {
        return 'World!'
    }
}

describe('Test server QL routes', () => {
    const server = new QReactor({
        port: 4002
    });

    test('Is routes can initialize', () => {
        expect(new Promise<void>(r => { server.ql(ExampleQLController); r() })).resolves.not.toThrowError();
    });

    test('Can start', () => {
        expect(new Promise<void>(r => { server.start(); r() })).resolves.not.toThrowError();
    });

    test('Query is accessible', async () => {
        const { data } = await axios.get('http://localhost:4002/', {
            method: 'get',
            url: 'http://localhost:4002/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                query: `query TestQuery {
                    hello
                }`,
                variables: {}
            })
        });

        expect(data.data.hello).toBe('World!');
    });

    test('Can stop', () => {
        expect(server.stop()).toBe(undefined);
    });
});