import { Router } from "express";
import RootController from "../controllers/root";

// Router instance mapping get route to posts controller.
const router = Router();
router.get("/", RootController);

export default router;
