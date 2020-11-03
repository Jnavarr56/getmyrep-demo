import { Router } from "express";
import * as ElectionsController from "../controllers/elections";
import { ELECTIONS_ROUTE } from "../config/vars";

const router = Router();
router.get(ELECTIONS_ROUTE, ElectionsController.get);

export default router;
