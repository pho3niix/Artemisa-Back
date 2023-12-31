import { Router } from "express";
import aH from "express-async-handler";
import { celebrate } from "celebrate";
import Controllers from './users.controllers';
import Validations from './users.validations';
const router = Router();

/**@General_Actions */

router.route('/:UserId/profile')
    .put(
        celebrate({ body: Validations.UserUpdate, params: Validations.UserParams }),
        aH(Controllers.UpdateUserById)
    )

export default router;
