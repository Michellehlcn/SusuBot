'use strict';
const express = require("express");
const { getHomePage, getWebHook, postWebHook} = require("../controllers/homepageController.js");
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", getHomePage);
    router.get("/api/webhook", getWebHook);
    router.post("/api/webhook", postWebHook);


    return app.use("/", router);
};
module.exports=initWebRoutes;