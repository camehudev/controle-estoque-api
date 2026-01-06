import debug from 'debug';
import mongoose from 'mongoose';
import 'dotenv/config'
import config from 'config';

const log=debug('api_base:mongoose');

// const url = process.env.DATABASE;
// mongoose.connect(`${process.env.DATABASE_URL}`)
//   .then(() => log('Conectado ao MongoDB com sucesso'))
//   .catch(err => log('Falha ao conectar ao MongoDB', err));

// mongoose.connect(`${config.get('mongo.uri')}`)
mongoose.connect('mongodb+srv://listagemapidb:Mt4HNOtKde9MI3wg@listagedb.6tslclw.mongodb.net/?retryWrites=true&w=majority&appName=listagedb')
.then(() => log('Conectado ao MongoDB com sucesso'))
  .catch(err => log('Falha ao conectar ao MongoDB', err));

mongoose.connection.on('error', (err)=>log('mongodb err', err));


export default mongoose;
