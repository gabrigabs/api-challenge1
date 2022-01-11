import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      id: Joi.string().uuid()
    });

    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return next(error);
  }
};
