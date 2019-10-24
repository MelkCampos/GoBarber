import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';


import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import fileController from './app/controllers/fileController';
import ProviderController from './app/controllers/ProviderController';



import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// pode ser passada por parametro ou como middleware global
// ele apeans ficará valido paras rotas abaixo de seu script

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);



routes.post('/files', upload.single('file'), fileController.store);


export default routes;
