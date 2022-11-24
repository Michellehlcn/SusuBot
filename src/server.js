'use strict';
import { config } from "dotenv";
import express from "express";
import * as viewEngine from "./config/viewEngine.js";
import * as initWebRoute from "./routes/web.js";
import bodyParser from "body-parser";

let app = express();

// config view engine
viewEngine.configViewEngine(app);

// init all web routes
initWebRoute.initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
});

