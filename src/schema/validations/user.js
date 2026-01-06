import { celebrate, Joi, Segments, errors } from 'celebrate';


// 🔧 Schema com mensagens de erro personalizadas
const userSchema = Joi.object({
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
      'string.empty': 'A senha é um campo obrigatorio',
      'any.required': 'Campo obrigatorio'
    }),

    tipoUser: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.base': 'O nome deve ser um texto',
      'string.empty': 'O nome é obrigatório',
      'string.min': 'O nome deve ter no mínimo {#limit} caracteres',
      'any.required': 'O nome é obrigatório'
    })
});

export default userSchema