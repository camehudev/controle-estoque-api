import repository from '../repository/Usuario.js';

const Home = {
    index(req,res,next){
       try {
        
        repository.buscarUser(req.body.userName)
        .then(result=>{
            if(result){
                res.status(200).json({"data": 'Usuário encontrado! '})
            }})
        .catch(
            res.json("Usuario não Encontrado")
        )
        
       } catch (error) {
           console.log('Erro ao buscar usuario dentro do banco...')
       }

       
       
    },


    list(req, res, next){
        repository.list()
            .then( result =>{
                if (result){
                     res.json(result)
                }else{
                     next
                }
             })
            .catch(next)
    },

    create(req, res, next) {
        repository.create(req.body)
            .then(
                result =>{
                   if (result){
                        res.json(result)
                   }else{
                        next
                   }
                }
            )
            .catch(next); // Corrigido de cath para catch
    },

    byId(req, res, next) { 
        const id = req.params.id; // ou req.query.id, dependendo da sua rota     

        repository.byId(id)
            .then(response => {               
                if (response) {
                    res.json({
                    "_id": response['_id'],
                    "userName":response['userName'],
                    "tipoUser": response['tipoUser'],
                });
                } else {
                    res.status(404).json({ message: 'Usuario inexistente' });                }
            })
            .catch(next);
    },


    updateById(req, res, next){
        repository.updateById(req.params.id, req.body)
            .then( result =>{
                if (result){
                    res.json({
                        "_id": response['_id'],
                        "userName":response['userName'],
                        "tipoUser": response['tipoUser'],
                    })
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

export default Home 