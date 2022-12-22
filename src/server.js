'use strict';
//import { config } from "dotenv";
const express = require("express");
const configViewEngine = require("./config/viewEngine.js");
const initWebRoutes = require("./routes/web.js");
const bodyParser = require("body-parser");

let app = express()
app.use(bodyParser.json());

// Verify that the callback cam from Facebook
/*function verifyRequestSignature(req, res, buf) {
    var signature = req.headers["x-hub-signature-256"];

    if (!signature) {
        console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
    } else {
        var elements = signature.split("=");
        var signatureHash = elements[1];
        var expectedHash = crypto
            .createHmac("sha256", config.appSecret)
            .update(buf)
            .digest("hex");
        if (signatureHash != expectedHash) {
            throw new Error("Couldn't validate the request signature.");
        }
    }
}
*/
// config view engine
configViewEngine(app);

// init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
});

