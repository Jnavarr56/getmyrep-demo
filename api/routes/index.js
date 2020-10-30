import express from "express";
import RootRouter from "./root";
import { ROUTE_PREFIX } from "../config/vars";

/*
    Router instances in this folder have bound
    routes to controllers. Here we load those
    routers into a server instance that will
    have ALL our routes and be loaded into 
    the main server instance.
*/

const appRouter = express.Router();
appRouter.use(RootRouter);

export default express().use(ROUTE_PREFIX, appRouter);
