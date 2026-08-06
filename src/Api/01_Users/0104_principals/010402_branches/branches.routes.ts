import { Router } from "express";
import aH from "express-async-handler";
import { celebrate } from "celebrate";
import Controllers from './branches.controllers';
import Validations from './branches.validations';
import { Permissions } from '../../../00_Index/Index.middlewares';
const router = Router();

export default router;
