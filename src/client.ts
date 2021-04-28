
import * as net from 'net';

const HOST = 'localhost';
const PORT = 5000;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log(`Client connected to  ${HOST}:${PORT}`)
  
});

client.emit('alert', { id: 1 });
