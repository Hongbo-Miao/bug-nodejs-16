// OpenTelemetry need to be setup before importing other modules
import './reliability/utils/initTracer';
import http from 'http';
import app from './app';
import config from './config';
import initSentry from './log/utils/initSentry';

initSentry();

const { nodeEnv, port } = config;

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log({ nodeEnv, port }, 'env');
});
