'use strict';
import express from "express";
import * as homepageController from "../controllers/homepageController.js";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homepageController.getHomePage);
    router.get("/api/webhook", homepageController.getWebHook);
    router.post("/api/webhook", homepageController.postWebHook);


    return app.use("/", router);
};
export { initWebRoutes };