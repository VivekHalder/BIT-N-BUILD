import { Router } from 'express';
import { findUser, getAllUsers, loginUser, logoutUser, registerUser } from '../controllers/users.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').post( verifyJWT, logoutUser );

router.route('/find/:userId').get( findUser );

router.route('/get-all-users').get( getAllUsers );

export default router;