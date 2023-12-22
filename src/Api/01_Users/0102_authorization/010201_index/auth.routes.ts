import { Router } from "express";
import aH from "express-async-handler";
import { celebrate } from "celebrate";
import Controllers from './auth.controllers';
import Validations from './auth.validations';
const router = Router();

/**@General_Actions */
router.route('/')
    .post(
        celebrate({ body: Validations.UsersBody }),
        aH(Controllers.SignUp)
    )

router.route('/:UserId')
    .get(
        celebrate({ params: Validations.UserParams }),
        aH(Controllers.VerifyUser)
    )

export default router;
