import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            cidade: Joi.string().min(1).trim().required(),
            estado: Joi.string().min(1).trim().required()
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) throw error;
        return next();
    } catch (error) {
        return next(error);
    }
};
