import { Router } from "express";
import ElectionsController from "../controllers/elections";
import { ELECTIONS_ROUTE } from "../config/vars";

const router = Router();
router.get(ELECTIONS_ROUTE, ElectionsController);

export default router;
