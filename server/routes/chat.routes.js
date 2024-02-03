import { Router } from "express";
import { createChat, findChat, findUserChats } from "../controllers/chats.controllers.js";

const router = Router();

router.route('/').post( createChat );
router.route('/:userID').get( findUserChats );
router.route('/find/:firstID/:secondID').get( findChat );

export default router;