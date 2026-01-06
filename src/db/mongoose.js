import debug from 'debug';
import mongoose from 'mongoose';
import 'dotenv/config'
import config from 'config';

const log=debug('api_base:mongoose');

// const url = process.env.DATABASE;
// mongoose.connect(`${process.env.DATABASE_URL}`)
//   .then(() => log('Conectado ao MongoDB com sucesso'))
//   .catch(err => log('Falha ao conectar ao MongoDB', err));

mongoose.connect(`${config.get('mongoURI')}`)
.then(() => log('Conectado ao MongoDB com sucesso'))
  .catch(err => log('Falha ao conectar ao MongoDB', err));

mongoose.connection.on('error', (err)=>log('mongodb err', err));


export default mongoose;
