'use strict';
let getHomePage = (req, res) => {
  return res.render("homepage.ejs")
};

/** Fix import json
https://vercel.com/docs/concepts/functions/serverless-functions/runtimes#advanced-usage/technical-details/including-additional-files
**/
import { readFileSync } from 'fs';
import path from 'path';
import * as fs from 'fs';
const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
function loadPath(name) {
  
  const file = path.join(process.cwd(), 'src/views', name);
  const stringified = readFileSync(file, 'utf8');
  return stringified;
}

// FIX ES6

import { } from "dotenv/config";
import request from "request";



const menu = loadPath("greeting.template.json");
const chattingReply = loadPath("chattingReply.template.json");
const productGallery = loadPath("productGalleryReply.template.json");
const dollList = loadPath("dollList.json");
const animalList = loadPath("animalList.json");
const keychainList = loadPath("keychainList.json");
const personalRequestList = loadPath("personalRequestList.json");


// const menu = loadJSON("../views/greeting.template.json");
// const chattingReply = loadJSON("../views/chattingReply.template.json");
// const productGallery = loadJSON("../views/productGalleryReply.template.json");
// const dollList = loadJSON("../views/dollList.json");
// const animalList = loadJSON("../views/animalList.json");
// const keychainList = loadJSON("../views/keychainList.json");
// const personalRequestList = loadJSON("../views/personalRequestList.json");

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
  // console.log(req.body);
  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {

      // Get the webhook event. entry.messaging is an array, but 
      // will only ever contain one event, so we get index 0
      let webhook_event = entry.messaging[0];
      // console.log(webhook_event);
      console.log("[MESSAGING] " + JSON.stringify(entry.messaging));

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);


      // Check if the event is a message or postback and 
      // pass the event to the appropriate handler function
      if (sender_psid !== "1787439031468531" && webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (sender_psid !== "1787439031468531" && webhook_event.postback) {
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
  // console.log("[POSTBACK] " + JSON.stringify(received_postback));
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  // if (payload === 'yes') {
  //   response = { "text": "Thanks!" }
  // } else if (payload === 'no') {
  //   response = { "text": "Oops, try sending another image." }
  // }
  // callSendAPI(sender_psid, response);
  switch (payload.toUpperCase()) {
    case "INFO":
      callSendAPI(sender_psid, "De Dat mua hang tai SusuShop @thubonglenDN, ban vui xem san pham va gui tin nhan, mot trong nhung nhan vien cua chung toi se tu van cho ban. Chung toi nhan giao hang toan quoc, phi chuyen phat nhanh duoc tinh trong gia san pham. Ban neu can them thong tin chi tiet xin goi toi so +84914014406 de duoc tu van mien phi.");
      break;
    case "ADDRESS":
      callSendAPI(sender_psid, " Liên hệ địa chỉ SuSu shop: \n 14 Trần Văn Thành, Đà Nẵng \n K432 H36/29 Võ Nguyên Giáp, Đà Nẵng (xưởng sản xuất) \n 94 Phan Bội Châu, TP Huế (CN)");
      break;
    case "MENU":
      calSendAPIWithTemplate(sender_psid, "MENU");
      break;
    case "GALLERY":
      calSendAPIWithTemplate(sender_psid, "GALLERY");
      break;
    case "CHATTINGREPLY":
      calSendAPIWithTemplate(sender_psid, "CHATTINGREPLY");
      break;
    case "DOLL":
      calSendAPIWithTemplate(sender_psid, "DOLL");
      break;
    case "ANIMAL":
      calSendAPIWithTemplate(sender_psid, "ANIMAL");
      break;
    case "KEYCHAIN":
      calSendAPIWithTemplate(sender_psid, "KEYCHAIN");
      break;
    case "PERSONALREQUEST":
      calSendAPIWithTemplate(sender_psid, "PERSONALREQUEST");
      break;
    default:
      callSendAPI(sender_psid, "Ban Vui Long cho trong giay lat. Mot trong nhan vien cua chung toi se giup do va tu van cho ban.");
      break;

  }
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
async function handleMessage(sender_psid, message) {
  // handle message for react, like press like button
  // id like button

  //if (message && message.attachments && message.attachments[0].payload) {
  //  callSendAPI(sender_psid, "Thank you for viewing the catalogs");
  //  calSendAPIWithTemplate(sender_psid);
  //  return;
  // }
  console.log("[MESSAGE TEXT]" + message.text);
  let entitiesArr = ["hello", "thanks", "bye"];
  let entityChosen = "";
  entitiesArr.forEach(name => {
    let entity = firstTrait(message.nlp, name);
    if (entity && message.nlp.entities[name].confidence > 0.8) {
      entityChosen = name;
    }
  });

  switch (message.text.toUpperCase()) {
    case "MENU":
      calSendAPIWithTemplate(sender_psid, "MENU");
      break;
    case "XEM SAN PHAM GALLERY":
      calSendAPIWithTemplate(sender_psid, "GALLERY");
      break;
    default:
      break;

  }
};

//   if (entityChosen === "") {
//     console.log("[entitychosen=]------------or get here");
//     //default
//     calSendAPIWithTemplate(sender_psid);
//     // callSendAPI(sender_psid, `The bot is needed more training, try to say "thanks a lot" or "hi" to the bot`);
//   } else {
//     if (entityChosen === "greetings") {
//       // send greeting message
//       callSendAPI(sender_psid, "Hi there! this is SusuBot, Welcome to Susu Shop");
//     }
//     if (entityChosen === "thanks") {
//       // send thanks message
//       callSendAPI(sender_psid, "You're welcome");
//     }
//     if (entityChosen === "bye") {
//       // send bye message
//       callSendAPI(sender_psid, 'bye-bye!');
//     }
//   }
// };

let calSendAPIWithTemplate = (sender_psid, type) => {
  /**document fb message template
    https://developers.facebook.com/docs/messenger-platform/send-messages/templates
    https://developers.facebook.com/docs/messenger-platform/send-messages/template/generic/
  **/


  console.log("[TYPE] " + type);
  let content = "";
  switch (type) {
    case "MENU":
      content = menu
      break;
    case "GALLERY":
      content = productGallery;
      break;
    case "CHATTINGREPLY":
      content = chattingReply;
      break;
  }


  if (type !== "DOLL" && type !== "ANIMAL" && type !== "KEYCHAIN" && type !== "PERSONALREQUEST") {
    let body = {
      "recipient": {
        "id": sender_psid
      },
      "message": content
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
  } else {
    // Running multiple requests for media template
    switch (type.toUpperCase()) {
      case "DOLL":
        dollList.doll.forEach((key, value) => {
          sendMultiRequestAPI(sender_psid, key, "bupbe");
        });
        break;
      case "ANIMAL":
        animalList.animal.forEach((key, value) => {
          sendMultiRequestAPI(sender_psid, key, "thubong");
        });
        break;
      case "KEYCHAIN":
        keychainList.keychain.forEach((key, value) => {
          sendMultiRequestAPI(sender_psid, key, "Khoa");
        });
        break;
      case "PERSONALREQUEST":
        personalRequestList.personalrequest.forEach((key, value) => {
          sendMultiRequestAPI(sender_psid, key, "datHangCaNhan");
        });
        break;
    };
  };
};

function sendMultiRequestAPI(sender_psid, key, tag) {
  let body = {
    "recipient": {
      "id": sender_psid
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "media",
          "elements": [
            {
              "media_type": "image",
              "url": key.url,
              "buttons": [
                {
                  "type": "web_url",
                  "url": key.url,
                  "title": "Xem Chi tiet"
                }
                ,
                {
                  "type": "postback",
                  "title": `Hoi Gia ${tag} ${key.name}`,
                  "payload": "AskingPrice"
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

