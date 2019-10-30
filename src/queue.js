import 'dotenv/config';

import Queue from './lib/Queue';

Queue.processQueue();


// [ 1 ]- Esse arquivo foi feito, pois não irá executar 
//a aplicação na mesma execução (node)
// onde iremos rodar a fila.

// [ 2 ]- Assim a fila pode está rodando em um 
// core ou servidor separado da nossa aplicação
// e isso garantira mais performace