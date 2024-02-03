import { Router } from "express";
import { createMessage, getMessages } from "../controllers/messages.controllers.js";

const router = Router();

router.route( '/' ).post( createMessage );
router.route( '/get-messages/:chatID' ).get( getMessages );

export default router;