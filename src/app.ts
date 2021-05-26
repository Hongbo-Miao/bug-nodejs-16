import * as Sentry from '@sentry/node';
import cookieParser from 'cookie-parser';
import express from 'express';
import handleError from './error/controllers/handleError';

const app = express()
  .use(Sentry.Handlers.requestHandler()) // Must be the first middleware on the app
  .use(express.json())
  .use(cookieParser())
  .get('/', (req, res) => {
    res.send('Hello World!');
  })
  .use(Sentry.Handlers.errorHandler()) // Must be before any other error middleware and after all controllers
  .use(handleError);

export default app;
