import multer from 'multer';
import crypto from 'crypto';

// extname: retorna a extenção de um arquivo.
// resolver: caminho na aplicação
import { extname, resolve } from 'path';


export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'), // destinos dos arquivos
    filename: (req, file, callBack) => {
        // formatação de nome
        crypto.randomBytes(16, (/*callback*/ error, response) => {
          if(error) return callBack(error);

          // null: seria como não tivesse havido erro. Então o "error recebe null"
          return callBack(null, response.toString('hex') + extname(file.originalname));
        })
    },
  }),
};