import { Router } from "express";
import * as RepresentativesController from "../controllers/representatives";
import { REPRESENTATIVES_ROUTE } from "../config/vars";

const router = Router();
router.get(REPRESENTATIVES_ROUTE, RepresentativesController.get);

export default router;
