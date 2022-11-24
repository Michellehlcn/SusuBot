'use strict';
import express from "express";
import homepageController from "../controllers/homepageController.js";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homepageController.getHomePage);
    router.get("/webhook", homepageController.getWebHook);
    router.post("/webhook", homepageController.postWebHook);


    return app.use("/", router);
};
exports.default = initWebRoutes;