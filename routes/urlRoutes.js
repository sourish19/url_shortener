import { Router } from 'express';
import { requestedURL, redirectUrl, visitHistory } from '../controller/urlController.js';

const router = Router();

// router.route('/').get(renderHome);
router.route('/:shortid').get(redirectUrl);
router.route('/visithistory/:shortid').get(visitHistory);
router.route('/').post(requestedURL);

export default router;
