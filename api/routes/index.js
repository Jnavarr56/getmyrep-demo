import express from "express";
import GeocodeRouter from "./geocode";
import ElectionsRouter from "./elections";
import RepresentativesRouter from "./representatives";
import { ROUTE_PREFIX } from "../config/vars";

const appRouter = express.Router();
appRouter.use(GeocodeRouter);
appRouter.use(ElectionsRouter);
appRouter.use(RepresentativesRouter);

export default express().use(ROUTE_PREFIX, appRouter);
