import { Router } from "express";
import aH from "express-async-handler";
import { celebrate } from "celebrate";
import Controllers from './recovery.controllers';
import Validations from './recovery.validations';
const router = Router();

/**@General_Actions */

router.route('/')
    .post(
        celebrate({ body: Validations.RecoveryBody }),
        aH(Controllers.SendRecoveryToken)
    )
    .patch(
        celebrate({ body: Validations.ChangePasswordBody, query: Validations.ChangePasswordQuery }),
        aH(Controllers.SetPasswordByToken)
    )

export default router;
