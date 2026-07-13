import { Router } from "express";
import aH from "express-async-handler";
import { celebrate } from "celebrate";
import Controllers from './subscription.controllers';
import Validations from './subscription.validations';
const router = Router();

/**@General_Actions */

router.route('/')
    .post(
        aH(celebrate({ body: Validations.PlanBody })),
        aH(Controllers.CreateSubscriptionPlan)
    )

router.route('/:PlanId')
    .put(
        aH(celebrate({ body: Validations.PlanBody, params: Validations.PlanParams })),
        aH(Controllers.UpdatePlanById)
    )

export default router;
