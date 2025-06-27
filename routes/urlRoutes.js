import { Router } from 'express';
import isValidURL from '../middleware/validateURL.js';
import { renderHome } from '../controller/staticController.js';
import { requestedURL, redirectUrl, visitHistory } from '../controller/urlController.js';

const router = Router();

router.route('/').get(renderHome).post(isValidURL, requestedURL);
router.route('/:shortid').get(redirectUrl);
router.route('/visithistory/:shortid').get(visitHistory);

export default router;
