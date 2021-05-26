import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

const { HOST, HTTP_PROTOCOL, JWT_SECRET, LIGHTSTEP_TOKEN, NODE_ENV, PORT } = process.env;

if (HOST == null || HOST === '') {
  throw new Error('Failed to read HOST.');
}
if (HTTP_PROTOCOL == null || HTTP_PROTOCOL === '') {
  throw new Error('Failed to read HTTP_PROTOCOL.');
}
if (JWT_SECRET == null || JWT_SECRET === '') {
  throw new Error('Failed to read JWT_SECRET.');
}
if (LIGHTSTEP_TOKEN == null || LIGHTSTEP_TOKEN === '') {
  throw new Error('Failed to read LIGHTSTEP_TOKEN.');
}
if (NODE_ENV !== 'development' && NODE_ENV !== 'production' && NODE_ENV !== 'test') {
  throw new Error('Failed to read NODE_ENV.');
}
if (PORT == null || PORT === '') {
  throw new Error('Failed to read PORT.');
}

const config = {
  nodeEnv: NODE_ENV,
  httpProtocol: HTTP_PROTOCOL,
  port: Number(PORT),
  jwtSecret: JWT_SECRET,
  sentryOptions: {
    dsn: 'https://2f46725646834700b4c2675abbc2da6a@o379185.ingest.sentry.io/5375232',
    environment: NODE_ENV,
  },
};

export default config;
