import { Router } from 'express';
import isValidURL from '../middleware/validateURL.js';
import validateUser from '../middleware/auth.js';
import { renderHome, renderLogin, renderSignup } from '../controller/staticController.js';
import { requestedURL, redirectUrl, visitHistory } from '../controller/urlController.js';
import { userSignup, userLogin } from '../controller/authController.js';

const router = Router();

router.route('/login').get(renderLogin).post(validateUser, userLogin);
router.route('/signup').get(renderSignup).post(validateUser, userSignup);
router.route('/').get(renderHome).post(isValidURL, requestedURL);
router.route('/:shortID').get(redirectUrl);
router.route('/visithistory/:shortID').get(visitHistory);

export default router;
