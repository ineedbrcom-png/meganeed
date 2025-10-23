const { server, io } = require('../src/index');
const ioc = require('socket.io-client');

describe('Chat functionality', () => {
  let clientSocket1, clientSocket2;

  beforeAll((done) => {
    server.listen(3001, () => {
      clientSocket1 = ioc('http://localhost:3001');
      clientSocket2 = ioc('http://localhost:3001');
      clientSocket2.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket1.close();
    clientSocket2.close();
  });

  it('should connect a client', () => {
    expect(clientSocket1.connected).toBe(true);
  });

  it('should receive a message', (done) => {
    const message = 'Hello, World!';
    clientSocket1.on('chat message', (msg) => {
      expect(msg).toBe(message);
      done();
    });
    clientSocket2.emit('chat message', message);
  });
});
