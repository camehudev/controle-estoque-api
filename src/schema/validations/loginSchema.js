import {Joi, Segments } from 'celebrate';

const loginSchema = {
  [Segments.BODY]: Joi.object({
    userName: Joi.string()
    .min(3)
    .required()
    .messages({
        'string.base': 'O nome deve ser um texto',
        'string.empty': 'O nome é obrigatório',
        'string.min': 'O nome deve ter no mínimo {#limit} caracteres',
        'any.required': 'O nome é obrigatório'
      }),
    passUser: Joi.string()
    .min(6)
    .required()
    .messages({
        'string.base': 'O senha deve ser um texto',
        'string.empty': 'A senha é obrigatório',
        'string.min': 'A senha deve ter no mínimo {#limit} caracteres',
        'any.required': 'A senha é obrigatório'
      }),
  })
};

export default loginSchema
