const { config } = require("dotenv");

let getHomePage = (req, res) => {
    return res.render("homepage.ejs")
};
require("dotenv").config();
const MY_VERIFY_TOKEN = process.env.VERIFY_TOKEN;
let getWebHook = (res,req) => {
    let VERIFY_TOKEN = MY_VERIFY_TOKEN; 
     // Parse the query params
     let mode = req.query['hub.mode'];
     let token = req.query['hub.verify_token'];
     let challenge = req.query['hub.challenge'];
 
     // Checks if a token and mode is in the query string of the request
     if (mode && token) {
 
         // Checks the mode and token sent is correct
         if (mode === 'subscribe' && token === VERIFY_TOKEN) {
 
             // Responds with the challenge token from the request
             console.log('WEBHOOK_VERIFIED');
             res.status(200).send(challenge);
 
         } else {
             // Responds with '403 Forbidden' if verify tokens do not match
             res.sendStatus(403);
         }
     }
 };

let postWebHook = (res,req) => {
    let body = req.body;
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, {depth: null});

    //Send a 200 OK response if this is a page webhook

    if (body.object === "page" ) {
        //return a '200 OK' response to all requests
        res.status(200).send("EVENT_RECEIVED");

        // Determined which webhooks were triggered and get sender PSIDs and locale, message content

    } else {
        // Return a '404 NOT FOUND' if event is not from a page subscription
        res.sendStatus(404);
    }    
};

module.exports = {
    getHomePage: getHomePage,
    getWebHook: getWebHook,
    postWebHook: postWebHook
};