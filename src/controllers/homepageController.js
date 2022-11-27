'use strict';
let getHomePage = (req, res) => {
    return res.render("homepage.ejs")
};
// FIX ES6
import {} from "dotenv/config";

const MY_VERIFY_TOKEN = process.env.VERIFY_TOKEN;

let getWebHook = (req, res) => {

    let VERIFY_TOKEN = MY_VERIFY_TOKEN; 
    console.log("My verify token " + VERIFY_TOKEN);
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

let postWebHook = (req, res) => {

     // Parse the request body from the POST
  let body = req.body;
  console.log(req.body);
  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Get the webhook event. entry.messaging is an array, but 
      // will only ever contain one event, so we get index 0
    let webhook_event = entry.messaging[0];
    console.log(webhook_event);
    console.log("[MESSAGING] "+JSON.stringify(entry.messaging));

    // Get the sender PSID
    let sender_psid = webhook_event.sender.id;
    console.log('Sender PSID: ' + sender_psid);  
    

    // Check if the event is a message or postback and 
    // pass the event to the appropriate handler function
    if (webhook_event.message) {
      handleMessage(sender_psid, webhook_event.message);
    } else if (webhook_event.postback) {
      handlePostback(sender_psid, webhook_event.postback);
    }
  });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

// Handles messages events
let handleMessage =(sender_psid, received_message) =>{

};

// Handles messaging_postbacks events
let handlePostback = (sender_psid, received_postback)=> {

};

// Sends response messages via the Send API
let callSendAPI = (sender_psid, response) =>{
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": { "text": response }
  };

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v15.0/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if(!err) {
      console.log("message sent!");
    } else {
      console.error("Unable to send message:"+ err);
    }
  });
};

export {
    getHomePage,
    getWebHook,
    postWebHook
};