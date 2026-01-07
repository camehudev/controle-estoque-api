import repository from '../repository/Produto.js';
import token from '../util/token.js';
import bcrypt from 'bcryptjs';
import { celebrate, Joi, Segments } from 'celebrate';
import userSchema from '../schema/validations/user.js';



const Produto = {

    list(req, res, next) {
            repository.list()
              .then(result => {
                if (result) {
                  res.json(result);
                } else {
                  res.json('A lista está vazia');
                  
                  next(); // chama o próximo middleware
                }
              })
              .catch(next); // boa prática manter o catch direto com o middleware
        },

}

export default Produto 
