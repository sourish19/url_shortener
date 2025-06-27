import { Router } from 'express';
import isValidURL from '../middleware/validateURL.js';
import { renderHome } from '../controller/staticController.js';
import { requestedURL, redirectUrl, visitHistory } from '../controller/urlController.js';

const router = Router();

router.route('/').get(renderHome).post(isValidURL, requestedURL);
router.route('/:shortID').get(redirectUrl);
router.route('/visithistory/:shortID').get(visitHistory);

export default router;
