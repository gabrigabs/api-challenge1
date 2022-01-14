import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { serializer } from '../../utils/errorSerializer';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            id: Joi.string().uuid()
        });

        const { error } = schema.validate(req.params, { abortEarly: false });
        if (error) throw error;
        return next();
    } catch (error) {
        return next(serializer(error));
    }
};
