import http from 'http';
import app from './app';

import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();


const normalizePort = (val: string): number | string | false => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val; // Nom de pipe
  }
  if (port >= 0) {
    return port; // Numéro de port valide
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('❌ error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  console.log(`✅ Listening on ${bind} 🤙🏻`);
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

server.listen(port);
