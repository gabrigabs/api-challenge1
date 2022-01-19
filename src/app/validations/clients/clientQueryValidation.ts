import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { serializer } from '../../utils/errorSerializer';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            limit: Joi.number().min(1),
            page: Joi.number().min(1),
            id: Joi.string().uuid(),
            full_name: Joi.string().min(1),
            gender: Joi.string().min(1).trim(),
            birthdate: Joi.date()
        });

        const { error } = schema.validate(req.query, { abortEarly: false });
        if (error) throw error;
        return next();
    } catch (error) {
        return next(serializer(error));
    }
};
