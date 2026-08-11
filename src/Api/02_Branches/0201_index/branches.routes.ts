import { Router } from "express";
import aH from "express-async-handler";
import { celebrate } from "celebrate";
import Controllers from './branches.controllers';
import Validations from './branches.validations';
const router = Router();

router.route('/')
    .post(
        aH(celebrate({ body: Validations.BranchBody })),
        aH(Controllers.CreateBranchByPrincipal)
    )

export default router;
