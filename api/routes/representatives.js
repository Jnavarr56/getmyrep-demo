import { Router } from "express";
import RepresentativesController from "../controllers/representatives";
import { REPRESENTATIVES_ROUTE } from "../config/vars";

const router = Router();
router.get(REPRESENTATIVES_ROUTE, RepresentativesController);

export default router;
