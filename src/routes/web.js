import express from "express";
import homepageController from "../controllers/homepageController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homepageController.getHomePage);
    router.get("/webhook", homepageController.getWebHook);
    router.post("/webhook", homepageController.postWebHook);


    return app.use("/", router);
};

module.exports = initWebRoutes;