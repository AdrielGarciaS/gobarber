import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

const providersController = new ProvidersController();

providersRouter.get('/', providersController.index);

export default providersRouter;
