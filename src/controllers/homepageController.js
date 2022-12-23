'use strict';
let getHomePage = (req, res) => {
  return res.render("homepage.ejs")
};

/** Fix import json
https://vercel.com/docs/concepts/functions/serverless-functions/runtimes#advanced-usage/technical-details/including-additional-files
**/
// import { readFileSync } from 'fs';
// import path from 'path';
// import * as fs from 'fs';
// const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
// function loadPath(name) {

//   const file = path.join(process.cwd(), 'src/views', name);
//   const stringified = readFileSync(file, 'utf8');
//   return stringified;
// }

// FIX ES6

//import { } from "dotenv/config";
const request = require("request");



const menu = {
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "generic",
      "elements": [
        {
          "title": "SusuShop",
          "image_url": "https://i.ibb.co/zfrWwvb/311285146-482724763885727-3774812359597412412-n.jpg",
          "subtitle": "@thubonglenDN | We love things make you smile!",

          "default_action": {
            "type": "web_url",
            "url": "https://www.facebook.com/thubonglenDN/",
            "webview_height_ratio": "tall"
          },
          "buttons": [
            {
              "type": "web_url",
              "url": "https://www.facebook.com/thubonglenDN",
              "title": "Truy Cap Website"
            },
            {
              "type": "postback",
              "title": "Xem Album San Pham",
              "payload": "gallery"
            }, {
              "type": "postback",
              "title": "Tim hieu thong tin khac",
              "payload": "chattingReply"
            }
          ]
        }
      ]
    }
  }
}
  ;
const chattingReply = {
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "button",
      "text": "Ban muon tim hieu thong tin ve? ",
      "buttons": [
        {
          "type": "postback",
          "title": "Dia Chi Shop",
          "payload": "Address"
        },
        {
          "type": "phone_number",
          "title": "HotLine",
          "payload": "+84914014406"
        },
        {
          "type": "postback",
          "title": "Cach Mua & Giao Hang",
          "payload": "info"
        }
      ]
    }
  }
};

const productGallery = {
  "attachment": {
    "type": "template",
    "payload": {
      "template_type": "generic",
      "elements": [
        {
          "title": "Bup Be",
          "image_url": "https://i.ibb.co/ZXkNTcs/317387421-518249160333287-5469185184961958228-n.jpg",
          "subtitle": "@thubonglenDN",
          "default_action": {
            "type": "web_url",
            "url": "https://www.facebook.com/media/set/?set=a.2019002038312228&type=3",
            "webview_height_ratio": "tall"
          },
          "buttons": [
            {
              "type": "web_url",
              "url": "https://www.facebook.com/media/set/?set=a.2019002038312228&type=3",
              "title": "Truy Cap Bup Be Album"
            },
            {
              "type": "postback",
              "title": "Xem Bup Be Tieu Bieu",
              "payload": "Doll"
            }, {
              "type": "postback",
              "title": "Quay Lai Menu",
              "payload": "Menu"
            }
          ]
        }
        ,
        {
          "title": "Thu Bong",
          "image_url": "https://i.ibb.co/6ZfMbk7/287438020-3267379826807770-6134631675370093725-n.jpg",
          "subtitle": "@thubonglenDN",
          "default_action": {
            "type": "web_url",
            "url": "https://www.facebook.com/media/set/?set=a.2037219996490432&type=3",
            "webview_height_ratio": "tall"
          },
          "buttons": [
            {
              "type": "web_url",
              "url": "https://www.facebook.com/media/set/?set=a.2037219996490432&type=3",
              "title": "Truy Cap Thu Bong Album"
            },
            {
              "type": "postback",
              "title": "Xem Thu Bong Tieu bieu",
              "payload": "Animal"
            }, {
              "type": "postback",
              "title": "Quay Lai Menu",
              "payload": "Menu"
            }
          ]
        }
        ,

        {
          "title": "Moc Chia Khoa (KeyChain)",
          "image_url": "https://i.ibb.co/ncHtV8h/13521874-1787493441463090-4084777159008566609-n.jpg",
          "subtitle": "@thubonglenDN",
          "default_action": {
            "type": "web_url",
            "url": "https://www.facebook.com/media/set/?set=a.1787493301463104&type=3",
            "webview_height_ratio": "tall"
          },
          "buttons": [
            {
              "type": "web_url",
              "url": "https://www.facebook.com/media/set/?set=a.1787493301463104&type=3",
              "title": "Truy Cap Moc Chia Khoa Album"
            },
            {
              "type": "postback",
              "title": "Xem Moc Chia Khoa Tieu Bieu",
              "payload": "keychain"
            }, {
              "type": "postback",
              "title": "Quay Lai Menu",
              "payload": "Menu"
            }
          ]
        }
        ,
        {
          "title": "Dat Hang Ca Nhan",
          "image_url": "https://i.ibb.co/CWvFDv4/60329660-2348976958648066-1534606933145681920-n.jpg",
          "subtitle": "@thubonglenDN",
          "default_action": {
            "type": "web_url",
            "url": "https://www.facebook.com/media/set/?set=a.2348972388648523&type=3",
            "webview_height_ratio": "tall"
          },
          "buttons": [
            {
              "type": "web_url",
              "url": "https://www.facebook.com/media/set/?set=a.2348972388648523&type=3",
              "title": "Truy Cap Dat Hang Ca Nhan Album"
            },
            {
              "type": "postback",
              "title": "Xem Dat Hang Ca Nhan Tieu Bieu",
              "payload": "personalRequest"
            }, {
              "type": "postback",
              "title": "Quay Lai Menu",
              "payload": "Menu"
            }
          ]
        }
      ]
    }
  }
};
const dollList = {
  "doll": [
    {
      "id": "1",
      "name": "D001",
      "desc": "Blond girl in green skirt",
      "url": "https://www.facebook.com/photo/?fbid=2135034296709001&set=a.2019002038312228"
    },
    {
      "id": "2",
      "name": "D002",
      "desc": "",
      "url": "https://www.facebook.com/photo/?fbid=2144439765768454&set=a.2019002038312228"
    },
    {
      "id": "3",
      "name": "D003",
      "desc": "",
      "url": "https://www.facebook.com/photo/?fbid=2462556990623395&set=a.2019002038312228"
    },
    {
      "id": "4",
      "name": "D004",
      "desc": "Harry Porter",
      "url": "https://www.facebook.com/photo/?fbid=2634715323407560&set=a.2019002038312228"
    },
    {
      "id": "5",
      "name": "D005",
      "desc": "",
      "url": "https://www.facebook.com/photo/?fbid=2656760467869712&set=a.2019002038312228"
    },
    {
      "id": "6",
      "name": "D006",
      "desc": "Police Man",
      "url": "https://www.facebook.com/photo/?fbid=2675540369325055&set=a.2019002038312228"
    },
    {
      "id": "7",
      "name": "D007",
      "desc": "red ao dai girl",
      "url": "https://www.facebook.com/photo/?fbid=2919554181590338&set=a.2019002038312228"
    },
    {
      "id": "8",
      "name": "D008",
      "desc": "bride",
      "url": "https://www.facebook.com/photo/?fbid=3349166275295791&set=a.2019002038312228"
    }
  ]
};
const animalList = {
  "animal": [
    {
      "id": "1",
      "name": "A001",
      "desc": "Pink Bunny",
      "url": "https://www.facebook.com/photo/?fbid=3267379830141103&set=a.2037219996490432"
    },
    {
      "id": "2",
      "name": "A002",
      "desc": "Teddy Bear",
      "url": "https://www.facebook.com/photo/?fbid=2473965912815836&set=a.2037219996490432"
    },
    {
      "id": "3",
      "name": "A003",
      "desc": "Squirrel",
      "url": "https://www.facebook.com/photo/?fbid=2357413771137718&set=a.2037219996490432"
    },
    {
      "id": "4",
      "name": "A004",
      "desc": "Unicorn",
      "url": "https://www.facebook.com/photo?fbid=533626918795511&set=a.2037219996490432"
    },
    {
      "id": "5",
      "name": "A005",
      "desc": "Sausage",
      "url": "https://www.facebook.com/photo/?fbid=2367445466801215&set=a.2037219996490432"
    },
    {
      "id": "6",
      "name": "A006",
      "desc": "Max",
      "url": "https://www.facebook.com/photo/?fbid=2270913509787745&set=a.2037219996490432"
    }
  ]
};
const keychainList = {
  "keychain": [
    {
      "id": "1",
      "name": "K001",
      "desc": "B",
      "url": "https://www.facebook.com/photo/?fbid=1957071847838581&set=a.1787493301463104"
    },
    {
      "id": "2",
      "name": "K002",
      "desc": "Doraemon",
      "url": "https://www.facebook.com/photo/?fbid=1957071804505252&set=a.1787493301463104"
    },
    {
      "id": "3",
      "name": "K003",
      "desc": "Tiger",
      "url": "https://www.facebook.com/photo/?fbid=1957071901171909&set=a.1787493301463104"
    },
    {
      "id": "4",
      "name": "K004",
      "desc": "Banana",
      "url": "https://www.facebook.com/photo/?fbid=1957071977838568&set=a.1787493301463104"
    },
    {
      "id": "5",
      "name": "K005",
      "desc": "Dog",
      "url": "https://www.facebook.com/photo/?fbid=2085171028361995&set=a.1787493301463104"
    },
    {
      "id": "6",
      "name": "K006",
      "desc": "Workers",
      "url": "https://www.facebook.com/photo/?fbid=3060365067509248&set=a.1787493301463104"
    }
  ]
};
const personalRequestList = {
  "personalrequest": [
    {
      "id": "1",
      "name": "P001",
      "desc": "KIKI",
      "url": "https://www.facebook.com/photo/?fbid=2348976951981400&set=a.2348972388648523"
    },
    {
      "id": "2",
      "name": "P002",
      "desc": "LOKI",
      "url": "https://www.facebook.com/photo/?fbid=2348976595314769&set=a.2348972388648523"
    },
    {
      "id": "3",
      "name": "P003",
      "desc": "",
      "url": "https://www.facebook.com/photo/?fbid=2348976881981407&set=a.2348972388648523"
    }
  ]
};


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
      let receiver_psid = webhook_event.recipient.id;
      console.log('Sender PSID: ' + sender_psid);


      // Check if the event is a message or postback and 
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, receiver_psid, webhook_event.message);
      } else if (sender_psid !== process.env.SUSUSHOP_ID && webhook_event.postback) {
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
  console.log("[MESSAGE POSTBACK] " + payload);

  // Set the response based on the postback payload
  // if (payload === 'yes') {
  //   response = { "text": "Thanks!" }
  // } else if (payload === 'no') {
  //   response = { "text": "Oops, try sending another image." }
  // }
  // callSendAPI(sender_psid, response);
  switch (payload.toUpperCase()) {
    case "INFO":
      callSendAPI(sender_psid, "De dat mua hang tai SusuShop, ban vui xem san pham va gui tin nhan, mot trong nhung nhan vien cua chung toi se tu van cho ban. Chung toi nhan giao hang toan quoc thong qua chuyen phat nhanh. Ban neu can them thong tin chi tiet xin goi toi so +84914014406 de duoc tu van mien phi.");
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
async function handleMessage(sender_psid, receiver_psid, message) {
  // handle message for react, like press like button
  // id like button

  //if (message && message.attachments && message.attachments[0].payload) {
  //  callSendAPI(sender_psid, "Thank you for viewing the catalogs");
  //  calSendAPIWithTemplate(sender_psid);
  //  return;
  // }


  if (sender_psid === process.env.SUSUSHOP_ID) {
    if (message.text !== 'undefined') {

      // For greeting message from Shop, attach Menu Template message
      const regex = /(^|\s)@thubonglenDN(\s|$)/gmi;
      console.log("[MESSAGE TEXT]" + message.text);
      // Alternative syntax using RegExp constructor
      // const regex = new RegExp('(^|\\s)@thubonglenDN(\\s|$)', 'gmi')

      const str = message.text;
      const subst = ``;

      // The substituted value will be contained in the result variable
      try {
        const result = str.match(regex);
        if (result !== null) {
          console.log("[MENU MATCH]");
          calSendAPIWithTemplate(receiver_psid, "MENU");

        }
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    console.log("[MESSAGE TEXT]" + message.text);
    switch (message.text.toUpperCase()) {
      case "MENU":
        calSendAPIWithTemplate(sender_psid, "MENU");
        break;
      case ("Bạn có thể giới thiệu gì đó cho tôi không?").toUpperCase():
        calSendAPIWithTemplate(sender_psid, "MENU");
        break;
      case "XEM SAN PHAM GALLERY":
        calSendAPIWithTemplate(sender_psid, "GALLERY");
        break;
      case ("Tôi có thể xem các sản phẩm khác không?").toUpperCase():
        calSendAPIWithTemplate(sender_psid, "GALLERY");
        break;

    }
  }
  // let entitiesArr = ["hello", "thanks", "bye"];
  // let entityChosen = "";
  // entitiesArr.forEach(name => {
  //   let entity = firstTrait(message.nlp, name);
  //   if (entity && message.nlp.entities[name].confidence > 0.8) {
  //     entityChosen = name;
  //   }
  // });

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
module.exports = {
  getHomePage,
  getWebHook,
  postWebHook
};

