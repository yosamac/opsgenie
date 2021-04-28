import * as net from 'net';

const HOST = 'localhost';
const PORT = 5000;

const server = net.createServer();

server.listen(PORT, HOST, () => {
  console.log('Server listening on %s', server.address());
});

server.on('connection', (socket) => {
  socket.on('alert', (data) => {
    console.log(data);
  });
});
