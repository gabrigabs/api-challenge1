import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { serializer } from '../../utils/errorSerializer';
import { States } from '../../utils/stateEnum';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            city: Joi.string().min(1).trim().required(),
            state: Joi.string()
                .valid(...Object.keys(States))
                .trim()
                .required()
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) throw error;
        return next();
    } catch (error) {
        return next(serializer(error));
    }
};
