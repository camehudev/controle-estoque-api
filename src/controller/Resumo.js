
import repository from '../repository/Resumo';


const Resumo = {

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
    if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
        return res.status(401).json({ status: 401, message: "Objeto Movimentação não pode estar vazio" });
    }

    repository.create(req.body)
        .then(result => {
            if (result) {
                return res.status(200).json({status:200, message:'Movimentação salva com sucesso!'});
            } else {
                return next(new Error("Erro ao criar movimentação"));
            }
        })
        .catch(next);
  },


   async delMovimentacao(req, res, next) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(401).json({ status: 401, message: "É necessário fornecer pelo menos 1 ID" });
        }

        const result = await repository.deletarMovItem(id); // ← AQUI ESTAVA O ERRO

        if (result && result.deletedCount > 0) {
            
            return res.status(200).json({ status: 200, mensagem: "Item da Lista deletado com sucesso!" });
        } else {
            return res.status(404).json({ status: 404, mensagem: "Item não encontrado ou já deletado" });
        }

    } catch (err) {
        next(err);
    }
},


   async updateId(req, res, next) {
  try {
    const updated = await repository.upById(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ status: 404, message: 'Movimentação não encontrada para atualização.' });
    }

            res.status(200).json({
            status: 200,
            message: 'Movimentação atualizada com sucesso!',
            });

        } catch (err) {
            console.error(err); // ajuda no debug
            res.status(500).json({
            status: 500,
            message: 'Erro ao atualizar movimentação',
            error: err.message || err
            });
        }
        },


     async listPorMes(req, res, next){

        try {
           

            const listaMesAno = await repository.listPorMes(req.body);    
            
              if (!listaMesAno) {
                  return res.status(404).json({ status: 404, message: 'Movimentação não encontrada.' });
               }

                res.status(200).json({
                status: 200,
                data: listaMesAno,

            });
            
        } catch (error) {

             console.error(err); // ajuda no debug
            res.status(500).json({
            status: 500,
            message: 'A lista está apresentando algum erro',
            error: err.message || err
            });
            
        }
        


     }




}

export default Resumo