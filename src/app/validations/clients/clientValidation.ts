import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { serializer } from '../../utils/errorSerializer';
import { Gender } from '../../utils/genderEnum';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            nome_completo: Joi.string().min(1).trim().required(),
            genero: Joi.string().valid(Gender.masculino, Gender.feminino, Gender.outro).trim().required(),
            data_nascimento: Joi.date().required(),
            idade: Joi.number().required().min(1),
            id_cidade: Joi.string().uuid().required()
        });

        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) throw error;
        return next();
    } catch (error) {
        return next(serializer(error));
    }
};
