import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import radisConfig from '../config/radis';

// onde se declara todos os 'jobs'
// igual ao que foi feito em "index.js" na pasta "database"
const jobs = [CancellationMail];

// criação de filas
// uma fila para cada serviço: como atualizar senha, cancelamento de pedido e etc
class Queue {
  constructor() {
    // filas
    this.queues = {};

    this.init();
  }

  // [ 1 ] - Para cada "job" é criada uma "fila". 
  // [ 2 ] - Dentro dessa "fila" é armazenado o "bee"
  // bee: instancia que conecta com o "radis"que armazena e recupera valores do "banco e dados"

  // [ 3 ] - "Handlle": onde é processado as filas



  init(){
    // não se o usa o 'map' para o mapeamento, pq não irá nos retornar nada.
     jobs.forEach(({ key, handle }) => {
       this.queues[key] = {
          bee: new Bee(key, {
            redis: radisConfig,
          }),
          handle,
       }
     });
  }

  // adicionando novos "jobs" na fila, para eles serem processados
  // queue: a qual fila será adicionado o novo trabalho, 
  //jobs: De onde vem os metados "appointment" e etc, passandos no handle
  add(queue, job) {
    // dentro de [queue](parâmetro), por exemplo poderia haver o "CancellationMail"
    return this.queues[queue].bee.createJob(job).save();
  }

  // processamento de filas
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, error) {
    console.log(`Queue ${job.queue.name}: FAILDED `, error);
  }
}

export default new Queue();