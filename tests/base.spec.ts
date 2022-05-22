import QReactor from '../src/index';

describe('Test server initialization without any routes', () => {
    const server = new QReactor();
    
    test('Is initialized', () => {
        expect(server).toBeInstanceOf(QReactor);
    });

    test('Can start', () => {
        expect(new Promise<void>(r => {server.start();r()})).resolves.not.toThrowError();
    });

    test('Can stop', () => {
        expect(server.stop()).toBe(undefined);
    });
});
