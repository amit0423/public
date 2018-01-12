const functions = require('firebase-functions'); // Cloud Functions for Firebase library
//const request = require('request');

var firebase =require('firebase');
var config = {
    apiKey: "AIzaSyCdb1HzXA3aBH6udAJsVRQPCD5FjkOsCX4",
    authDomain: "newagent-79cf2.firebaseapp.com",
    databaseURL: "https://newagent-79cf2.firebaseio.com",
    projectId: "newagent-79cf2",
    storageBucket: "newagent-79cf2.appspot.com",
    messagingSenderId: "688728226903"
  };
  firebase.initializeApp(config);

  var ref=firebase.database().ref('external/barcode/GTIN');
var messageRef=ref.child('external/barcode/GTIN');
  console.log("firebase",messageRef.key);


exports.dialogflowFirebaseProduct = functions.https.onRequest((request, response) => {
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  console.log(request.body.result.action);
  if (request.body.result.action=='input.salam'||request.body.result.action=='input.barcodenumber') {
  	console.log("hello","hello");
  	barcodeSearch(request, response);
  } else if (request.body.result.action=='input.welcome') {
  	  	console.log("hello1","hello1");
 searchProduct(request, response);
 //   barcodeSearch(request, response);
  }

else if (request.body.result.action=='input.ingredient') {
  	  	console.log("hello2","hello2");
 getIngredientList(request, response);
 //   barcodeSearch(request, response);
  }
  else if (request.body.result.action=='input.types') {
  	  	console.log("hello3","hello3");
 analyzeIngredient(request, response);
 //   barcodeSearch(request, response);
  }
   else {
    console.log('Invalid Request');
    return response.status(400).end('Invalid Webhook Request (expecting v1 or v2 webhook request)');
  }
});

/*
* Function to handle v1 webhook requests from Dialogflow
*/
function searchProduct(request, response) {
	  	console.log("demooooooo","demoooooooo");

  let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters
  let parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters
  let inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts
  let requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
//  const app = new DialogflowApp({request: request, response: response});
  // Create handlers for Dialogflow actions as well as a 'default' handler
  const actionHandlers = {
    // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
    'input.welcome': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
     
        sendResponse('Hello, Welcome to my Dialogflow agent!'); // Send simple response to user
      
    },
	
	
   
    // Default handler for unknown or undefined actions
    'default': () => {
      
        let responseToUser = {
          //data: richResponsesV1, // Optional, uncomment to enable
          //outputContexts: [{'name': 'weather', 'lifespan': 2, 'parameters': {'city': 'Rome'}}], // Optional, uncomment to enable
         // speech: 'default else :This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
          text: 'default else :This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
        };
        sendResponse(responseToUser);
      }
  };

  // If undefined or unknown action use the default handler
  if (!actionHandlers[action]) {
    action = 'default';
  }
  // Run the proper handler function to handle the request from Dialogflow
  actionHandlers[action]();
  
  // Function to send correctly formatted responses to Dialogflow which are then sent to the user
  function sendResponse (responseToUser) {
    // if the response is a string send it as a response to the user
    if (typeof responseToUser === 'string') {
      let responseJson = {};
      responseJson.speech = responseToUser; // spoken response
      responseJson.displayText = responseToUser; // displayed response
      response.json(responseJson); // Send response to Dialogflow
    } else {
      // If the response to the user includes rich responses or contexts send them to Dialogflow
      let responseJson = {};
      // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
      responseJson.speech = responseToUser.speech || responseToUser.displayText;
      responseJson.displayText = responseToUser.displayText || responseToUser.speech;
      // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
      responseJson.data = responseToUser.data;
      // Optional: add contexts (https://dialogflow.com/docs/contexts)
      responseJson.contextOut = responseToUser.outputContexts;
      console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
      response.json(responseJson); // Send response to Dialogflow
    }
  }
}


function barcodeSearch(request, response) {
 console.log("demo","demo");
// 	console.log("demooooooo","demoooooooo");
  // var messageRef=ref.child('external/barcode/GTIN');

  let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters
  let parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters
  let inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts
  let requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
//  const app = new DialogflowApp({request: request, response: response});
  // Create handlers for Dialogflow actions as well as a 'default' handler
  const actionHandlers = {
    // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
    'input.salam': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
     
        sendResponse('Wa-Alaikum-Salaam'); // Send simple response to user
      
    },
	
	'input.barcodenumber': () => {
		console.log("barcode",action);
console.log("reference",ref.key);
// firebase.ref('external/barcode/GTIN/').get()
//                 .then((querySnapshot) => {
var playersRef = firebase.database().ref("external/barcode/GTIN/");
// playersRef.orderByChild("name").equalTo("93482615").on("child_added", function(data) {
//    console.log("Equal to filter: " + data.val().Brand);
// });

// playersRef.equalTo(93482608).on("child_added", function(data) {
//    console.log("Equal to filter: ","hehrkjhksg");
//    sendResponse('your barcode is matched');
// });

var queryRef = playersRef.orderByChild("fullName").equalTo("93482608");
playersRef.on("child_added", function(data, prevChildKey) {
   var newPlayer = data.val();
   console.log("Brand Name: " + newPlayer.Brand);
   console.log("GLN: " + newPlayer.GLN);
 // console.log("number: " + newPlayer.number);
   console.log("Previous Barcode: " + prevChildKey);
      sendResponse('your barcode is matched');

});

},
    // Default handler for unknown or undefined actions
    'default': () => {
      
        let responseToUser = {
          //data: richResponsesV1, // Optional, uncomment to enable
          //outputContexts: [{'name': 'weather', 'lifespan': 2, 'parameters': {'city': 'Rome'}}], // Optional, uncomment to enable
         // speech: 'default else :This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
          text: 'default else :This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
        };
        sendResponse(responseToUser);
      }
  };

  // If undefined or unknown action use the default handler
  if (!actionHandlers[action]) {
    action = 'default';
  }
  // Run the proper handler function to handle the request from Dialogflow
  actionHandlers[action]();
  
  // Function to send correctly formatted responses to Dialogflow which are then sent to the user
  function sendResponse (responseToUser) {
    // if the response is a string send it as a response to the user
    if (typeof responseToUser === 'string') {
      let responseJson = {};
      responseJson.speech = responseToUser; // spoken response
      responseJson.displayText = responseToUser; // displayed response
      response.json(responseJson); // Send response to Dialogflow
    } else {
      // If the response to the user includes rich responses or contexts send them to Dialogflow
      let responseJson = {};
      // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
      responseJson.speech = responseToUser.speech || responseToUser.displayText;
      responseJson.displayText = responseToUser.displayText || responseToUser.speech;
      // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
      responseJson.data = responseToUser.data;
      // Optional: add contexts (https://dialogflow.com/docs/contexts)
      responseJson.contextOut = responseToUser.outputContexts;
      console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
      response.json(responseJson); // Send response to Dialogflow
    }
  }
}

function getIngredientList(request, response) {
 console.log("demo3","demo3");
// 	console.log("demooooooo","demoooooooo");

  let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters
  let parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters
  let inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts
  let requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
//  const app = new DialogflowApp({request: request, response: response});
  // Create handlers for Dialogflow actions as well as a 'default' handler
  const actionHandlers = {
    // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
    'input.ingredient': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
     
        sendResponse('Happy to know your product is halal'); // Send simple response to user
      
    },
	
	
   
    // Default handler for unknown or undefined actions
    'default': () => {
      
        let responseToUser = {
          //data: richResponsesV1, // Optional, uncomment to enable
          //outputContexts: [{'name': 'weather', 'lifespan': 2, 'parameters': {'city': 'Rome'}}], // Optional, uncomment to enable
         // speech: 'default else :This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
          text: 'default else :This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
        };
        sendResponse(responseToUser);
      }
  };

  // If undefined or unknown action use the default handler
  if (!actionHandlers[action]) {
    action = 'default';
  }
  // Run the proper handler function to handle the request from Dialogflow
  actionHandlers[action]();
  
  // Function to send correctly formatted responses to Dialogflow which are then sent to the user
  function sendResponse (responseToUser) {
    // if the response is a string send it as a response to the user
    if (typeof responseToUser === 'string') {
      let responseJson = {};
      responseJson.speech = responseToUser; // spoken response
      responseJson.displayText = responseToUser; // displayed response
      response.json(responseJson); // Send response to Dialogflow
    } else {
      // If the response to the user includes rich responses or contexts send them to Dialogflow
      let responseJson = {};
      // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
      responseJson.speech = responseToUser.speech || responseToUser.displayText;
      responseJson.displayText = responseToUser.displayText || responseToUser.speech;
      // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
      responseJson.data = responseToUser.data;
      // Optional: add contexts (https://dialogflow.com/docs/contexts)
      responseJson.contextOut = responseToUser.outputContexts;
      console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
      response.json(responseJson); // Send response to Dialogflow
    }
  }
}

function analyzeIngredient(request, response) {
 console.log("demo4","demo4");
// 	console.log("demooooooo","demoooooooo");

  let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters
  let parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters
  let inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts
  let requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
//  const app = new DialogflowApp({request: request, response: response});
  // Create handlers for Dialogflow actions as well as a 'default' handler
  const actionHandlers = {
    // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
    'input.types': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
     
        sendResponse('Please wait for a while'); // Send simple response to user
      
    },
	
	
   
    // Default handler for unknown or undefined actions
    'default': () => {
      
        let responseToUser = {
          //data: richResponsesV1, // Optional, uncomment to enable
          //outputContexts: [{'name': 'weather', 'lifespan': 2, 'parameters': {'city': 'Rome'}}], // Optional, uncomment to enable
         // speech: 'default else :This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
          text: 'default else :This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
        };
        sendResponse(responseToUser);
      }
  };

  // If undefined or unknown action use the default handler
  if (!actionHandlers[action]) {
    action = 'default';
  }
  // Run the proper handler function to handle the request from Dialogflow
  actionHandlers[action]();
  
  // Function to send correctly formatted responses to Dialogflow which are then sent to the user
  function sendResponse (responseToUser) {
    // if the response is a string send it as a response to the user
    if (typeof responseToUser === 'string') {
      let responseJson = {};
      responseJson.speech = responseToUser; // spoken response
      responseJson.displayText = responseToUser; // displayed response
      response.json(responseJson); // Send response to Dialogflow
    } else {
      // If the response to the user includes rich responses or contexts send them to Dialogflow
      let responseJson = {};
      // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
      responseJson.speech = responseToUser.speech || responseToUser.displayText;
      responseJson.displayText = responseToUser.displayText || responseToUser.speech;
      // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
      responseJson.data = responseToUser.data;
      // Optional: add contexts (https://dialogflow.com/docs/contexts)
      responseJson.contextOut = responseToUser.outputContexts;
      console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
      response.json(responseJson); // Send response to Dialogflow
    }
  }
}