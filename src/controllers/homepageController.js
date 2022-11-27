'use strict';
let getHomePage = (req, res) => {
  return res.render("homepage.ejs")
};
// FIX ES6
import { } from "dotenv/config";
import request from "request";

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
    body.entry.forEach(function (entry) {

      // Get the webhook event. entry.messaging is an array, but 
      // will only ever contain one event, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      console.log("[MESSAGING] " + JSON.stringify(entry.messaging));

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

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  callSendAPI(sender_psid, response);
};

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
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
    if (!err) {
      console.log("message sent!");
    } else {
      console.error("Unable to send message:" + err);
    }
  });
};

function firstTrait(nlp, name) {
  return nlp && nlp.entities & nlp.entities[name] && nlp.entities[name][0];
}

// Handles messages events
function handleMessage(sender_psid, message) {
  // handle message for react, like press like button
  // id like button

  if (message && message.attachments && message.attachments[0].payload) {
    callSendAPI(sender_psid, "Thank you for viewing the catalogs");
    calSendAPIWithTemplate(sender_psid);
    return;
  }

  let entitiesArr = ["greetings", "thanks", "bye"];
  let entityChosen = "";
  entitiesArr.forEach(name => {
    let entity = firstTrait(message.nlp, name);
    if (entity && message.nlp.entities[name].confidence > 0.8) {
      entityChosen = name;
    }
  });

  if (entityChosen === "") {
    //default
    callSendAPI(sender_psid, `The bot is needed more training, try to say "thanks a lot" or "hi" to the bot`);
  } else {
    if (entityChosen === "greetings") {
      // send greeting message
      callSendAPI(sender_psid, "Hi there! this is SusuBot, Welcome to Susu Shop");
    }
    if (entityChosen === "thanks") {
      // send thanks message
      callSendAPI(sender_psid, "You're welcome");
    }
    if (entityChosen === "bye") {
      // send bye message
      callSendAPI(sender_psid, 'bye-bye!');
    }
  }
};

let calSendAPIWithTemplate = (sender_psid) => {
  // document fb message template
  // https://developers.facebook.com/docs/messenger-platform/send-messages/templates
  // https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic/

  let body = {
    "recipient": {
      "id": sender_psid
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
            {
              "title": "Crochet Dolls",
              "image_url": "https://www.nexmo.com/wp-content/uploads/2018/10/build-bot-messages-api-768x384.png",
              "subtitle": "Crochet Dolls subtitle",
              "buttons": [
                {
                  "type": "web_url",
                  "url": "https://susu-bot.herokuapp.com",
                  "title": "Click"
                }
              ]
            }
          ]
        }
      }
    }
  };

  request({
    "uri": "https://graph.facebook.com/v15.0/me/messages",
    "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent');
    } else {
      console.error("Unable to send message: " + err);
    }
  });
};
export {
  getHomePage,
  getWebHook,
  postWebHook
};

// Same response
// [MESSAGING]
// [{ 
//   "sender": { "id": "4518690248161445" }, 
//   "recipient": { "id": "1787439031468531" }, 
//   "timestamp": 1669550325076, 
//   "message": { 
//     "mid": "m_2GBMvD7GJOOCbu11FmktxiD_b6zWZ0U6iABKQ6vmClv0DgF_vL6SxCogG5-lvSpXqoyI4o5IHnsCNun6yBdpLA", 
//     "text": "hello", 
//     "nlp": { 
//       "entities": 
//       { 
//         "sentiment": 
//         [{ 
//           "confidence": 0.54351806640625, 
//           "value": "positive" 
//         }], 
//         "greetings": 
//         [{ 
//           "confidence": 0.99988770484924, 
//           "value": "true" 
//         }] 
//       }, 
//       "detected_locales": 
//       [{ 
//         "locale": "en_XX", 
//         "confidence": 0.5896 
//       }] 
//     } }
//    }]