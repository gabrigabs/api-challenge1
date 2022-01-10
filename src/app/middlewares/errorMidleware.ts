/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
import { BadRequest, NotFound } from '../errors';

const errorMiddleware = async (error: Error, req: Request, res:Response, next:NextFunction) => {
  let status = 500;

  if (error instanceof BadRequest || ValidationError) status = 400;
  if (error instanceof NotFound) status = 404;

  return res.status(status).json(error);
};
export default errorMiddleware;
