import { Router } from "express";
import aH from "express-async-handler";
import { celebrate } from "celebrate";
import Controllers from './principals.controllers';
import Validations from './principals.validations';
import { Permissions } from '../../../00_Index/Index.middlewares';
import { OwnUser } from '../../../../Middlewares/Permissions.mw';
const router = Router();

router.use('/:UserId', aH(OwnUser()));

/**@General_Actions */
router.route('/:UserId/plans')
    .get(
        aH(celebrate({ params: Validations.PrincipalParams })),
        aH(Controllers.GetPlanByPrincipal)
    )

router.route('/:UserId/branches')
    .post(
        aH(celebrate({ params: Validations.PrincipalParams })),
        aH(celebrate({ body: Validations.BranchBody })),
        aH(Controllers.CreateBranchByPrincipal)
    )
    .get(
        aH(celebrate({ params: Validations.PrincipalParams })),
        aH(Controllers.GetInstitutionsByPrincipalId)
    )

router.route('/:UserId/branches/:BranchId')
    .put(
        aH(celebrate({ params: Validations.PrincipalAndInstitutionParams })),
        aH(celebrate({ body: Validations.BranchBody })),
        aH(Controllers.UpdateInstitutionByPrincipal)
    )

export default router;
