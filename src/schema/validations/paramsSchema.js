import {Joi, Segments } from 'celebrate';

const paramSchema = {
[Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })

}

export default paramSchema
