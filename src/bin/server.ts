import server from './app';
import config from '@config/config';

const serverPort = config.serverPort;

server.listen(serverPort || 3333, () => {
    console.log(`Server online, runing in port ${serverPort}`);
});