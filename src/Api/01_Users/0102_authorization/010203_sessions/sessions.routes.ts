import { Router } from "express";
import aH from "express-async-handler";
import { celebrate } from "celebrate";
import Controllers from './sessions.controllers';
import Validations from './sessions.validations';
const router = Router();

/**@General_Actions */

router.route('/')
    .post(
        celebrate({ body: Validations.Login }),
        aH(Controllers.Login)
    )
    .delete(
        aH(Controllers.LogOut)
    )

export default router;
