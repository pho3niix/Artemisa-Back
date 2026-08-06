import { Router } from "express";
import aH from "express-async-handler";
import { celebrate } from "celebrate";
import Controllers from './principals.controllers';
import Validations from './principals.validations';
import { Permissions } from '../../../00_Index/Index.middlewares';
const router = Router();

/**@General_Actions */
router.route('/:PrincipalId/plans')
.get(
    aH(celebrate({params: Validations.PrincipalParams})),
    aH(Controllers.GetPlanByPrincipal)
)

export default router;
