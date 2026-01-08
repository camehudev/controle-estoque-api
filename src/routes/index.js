import { Router } from 'express';
import Home from '../controller/Home.js'
import Usuario from '../controller/Usuario.js';
import Produto from '../controller/Produto.js';
import Movimentacao from '../controller/Movimentacao.js';
import authMiddleware from '../util/verifyToken.js';
import { celebrate } from 'celebrate';
import loginSchema from '../schema/validations/loginSchema.js';
import routerSchema from '../schema/validations/routerSchema.js';
import paramSchema from '../schema/validations/paramsSchema.js';


const routes = new Router();


/* routes.post('/api/v1',Home.index);
routes.get('/api/v1/list',celebrate(routerSchema), authMiddleware, Home.list);
routes.post('/api/v1/despesa',celebrate(routerSchema),authMiddleware, Home.create);
routes.get('/api/v1/list/:id',celebrate(routerSchema,paramSchema),authMiddleware, Home.byId);
routes.put('/api/v1/uplista/:id',celebrate(routerSchema, paramSchema),authMiddleware, Home.updateById);
routes.delete('/api/v1/delLista/:id',celebrate(routerSchema, paramSchema),authMiddleware, Home.delItemList);
routes.get('/api/v1/usuario/list',celebrate(routerSchema),authMiddleware, Usuario.list);
routes.post('/api/v1/usuario/create',celebrate(routerSchema), authMiddleware, Usuario.create);
routes.post('/api/v1/usuario/search',celebrate(loginSchema), Usuario.index);
routes.get('/api/v1/movimentacao',  Movimentacao.list);
routes.post('/api/v1/movimentacao/getListaMesAno',  Movimentacao.listPorMes);
routes.post('/api/v1/movimentacao/create', Movimentacao.create);
routes.put('/api/v1/movimentacao/update/:id', Movimentacao.updateId);
routes.delete('/api/v1/movimentacao/delete/:id', Movimentacao.delMovimentacao);
routes.get('/api/v1/resumo',  Movimentacao.list);
routes.post('/api/v1/resumo/getListaMesAno',  Movimentacao.listPorMes);
routes.post('/api/v1/resumo/create', Movimentacao.create);

*/

routes.get('/usuario/list', Usuario.list);
routes.get ('/produtos/list', Produto.list);
routes.post('/usuario/nUsuario', Usuario.create());
routes.post('/usuario/search', Usuario.index);





routes.get('/favicon.ico',authMiddleware,(req, res, next)=>{ 
     res.writeHead(200,{'Content-type': 'image/x-icon'});
     res.end('');    
 });
 

export default routes