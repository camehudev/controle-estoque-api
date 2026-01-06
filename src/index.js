import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from '../src/routes/index.js';
import{ errors } from 'celebrate';

const app = express();
app.use(cors()); // Permite todas as origens
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(routes);
app.use(errors());

app.use((req, res, next)=>{
  const err = new Error('Not Found');
  err.status=404;
  res.json('Pagina não encontrada')
  next(err)
})

// 🔥 Middleware de erros de validação personalizado
app.use((err, req, res, next) => {
  if (err.joi) {
    const mensagens = err.joi.details.map(detail => detail.message);
    return res.status(401).json({ erros: mensagens });
  }

  return next(err);
});

// Captura de erros não tratados
 process.on('unhandledRejection', (reason) => {
  console.error(reason.message);

});

process.on('uncaughtException', (error) => {
  console.error('Exceção não tratada 2:', error.message);
});


export default app


