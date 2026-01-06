import app from '../index.js';
import cluster from 'cluster';
import { debug } from 'console';
import os from 'os';
import dnscache from 'dnscache';
import http from 'http';
import https from 'https';


http.globalAgent.keepAlive = true;
https.globalAgent.keeepAlive = true;

const log= debug('');

const cpus = os.cpus();
const onWorkerError = (code,signal)=>log(code, signal);

dnscache({
    "enable":true,
    "ttl":300,
    "cachesize":1000
})

if(cluster.isWorker){
    cpus.forEach(_=>{
    const worker = cluster.fork()
    worker.on('error', onWorkerError)
    });

    cluster.on('exit',(err)=>{log(eer)
    const newWork = cluster.fork()
    newWork.on('error', onWorkerError)
    log('A new worker rises', newWork.process.id)
    });
    cluster.on('exit',(err)=>log(err))
}else{
    const server = app.listen(process.env.PORT || 3000, () => {console.log('Servidor Online')});
    server.on('error', (err)=>log(err));
    
};