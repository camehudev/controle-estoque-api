import {Joi, Segments } from 'celebrate';

const routerSchema = {

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown() // permite outros headers além do 'authorization'
    }


    export default routerSchema