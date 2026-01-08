import repository from '../repository/Usuario.js';
import token from '../util/token.js';
import bcrypt from 'bcryptjs';
import { celebrate, Joi, Segments } from 'celebrate';
import userSchema from '../schema/validations/user.js';


const Usuario = {
  
 async index(req, res) {
    try {
      const { userName, passUser } = req.body;

      const response = await repository.buscarUser(userName);

      if (!response) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const hashCompare = await bcrypt.compare(
        passUser,
        response.passUser
      );

      if (!hashCompare) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const jwtToken = token.create({
        id: response.id,
        userName: response.userName,
        tipo: response.tipoUser
      });

      return res.status(200).json({
        usuario: response.userName,
        tipo: response.tipoUser,
        token: jwtToken
      });

    } catch (error) {
      console.error('Erro ao tentar autenticar:', error);
      return res.status(500).json({
        message: 'Erro interno no servidor'
      });
    }
  },

      
    list(req, res, next) {
        repository.list()
          .then(result => {
            if (result) {
              res.json(result);
            } else {
              next(); // chama o próximo middleware
            }
          })
          .catch(next); // boa prática manter o catch direto com o middleware
    },      

  create() {
      return [
        async (req, res) => {         
        try {
           
            const response = await repository.create(req.body);

            return res.status(201).json({
             message: 'Usuario criado com sucesso!',
              ata: response._id
            });
            
          } catch (err) {
            return res.status(500).json({
              message: 'Erro ao salvar Usuario!'
            });
          }
        }
      ];
    },



    byId(req, res, next){ 
        repository.byid(req.body)
       .then( result =>{
            if (result){
                 res.json(result)
            }
        })

       .catch(next); // Corrigido de cath para catch
      },



    updateById(req, res, next){
        repository.updateById(req.params.id, req.body)
            .then( result =>{
                if (result){
                    res.json(result)
                }
            })
            .catch(next); // Corrigido de cath para catch
       },


       delItemList(req, res, next){
            repository.delItemList(req.body)
            .then( result =>{
                if (result){
                     res.json(result)
                }
            })
            
           .catch(next); // Corrigido de cath para catch
          },

    
}

export default Usuario 