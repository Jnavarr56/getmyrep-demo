import { Router } from "express";
import * as GeocodeController from "../controllers/geocode";
import { GEOCODE_ROUTE } from "../config/vars";

const router = Router();
router.get(GEOCODE_ROUTE, GeocodeController.get);

export default router;
