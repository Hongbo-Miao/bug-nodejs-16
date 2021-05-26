import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error({ err }, 'handleError');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  res.end(res.sentry);
};

export default handleError;
