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

      const hashCompare = await bcrypt.compare(passUser, response.passUser); // supondo que seja `response.passUser`
      if (!hashCompare) {
        return res.status(401).json({ message: 'Credenciais inválidas!' });
      }

      return res.status(200).json({
        usuario: response.userName,
        tipo: response.tipoUser,
        token: token.create(userName)
      });

    } catch (error) {
      console.error('Erro ao tentar autenticar:', error);
      return res.status(500).json({ message: 'Erro interno no servidor', erro: error });
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
       celebrate({
          [Segments.BODY]: userSchema
        }),
        (req, res) => {
          console.log(req.body)
          repository.create(req.body)
          .then(response=>{
              if(response){
                  res.status(200).json({
                    message: 'Usuario criado com sucesso!',
                    data:response['_id']})
              }
          })
          .catch(()=>{
              res.json({messge:"Erro ao salvar Usuario!"})
          })
        }                    
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