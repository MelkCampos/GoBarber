import 'dotenv/config';
// pode importar todas as suas variaveis atrávez do "process."
import express from 'express';

// vir antes das rotas, para que assim as rotas sofram esa alteração
import 'express-async-errors';
// ------------------------------
import path from 'path';
import Youch from 'youch';
import routes from './routes';

// Tratamento de exceções
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';



import './database';
 
class App {
  constructor() {
      this.server = express();

      Sentry.init(sentryConfig);

      this.middlewares();
      this.routes();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
    '/files', 
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHnadler() {
    // middleware de 4 parametros, é um middleware de exeção
    this.server.use(async (error, req, res, next) => {

      // apenas mostrar tais erros (que envolven dados sensiveis, quando a aplicação
      // estiver em modo de desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(error, req).toJSON();

        // erro 500: erro se servidor. "Error: internal error"
        return res.status(500).json(errors);
        
      }
      
        return res.status(500).json({ error: 'Internal server error.' });
    });
  }
}

// exportando diretamente o server
// module.exports = new App().server;
export default new App().server;