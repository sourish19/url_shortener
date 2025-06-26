import { Router } from 'express';
import { renderHome } from '../controller/urlController.js';

const staticRouter = Router();

staticRouter.route('/').get(renderHome);

export default staticRouter;
