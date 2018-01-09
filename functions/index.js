

const functions = require('firebase-functions'); // Cloud Functions for Firebase library

exports.dialogflowFirebaseProduct = functions.https.onRequest((request, response) => {
 
  if (request.body.result) {
    searchProduct(request, response);
  } else if (request.body.queryResult) {
    barcodeSearch(request, response);
  } else {
    console.log('Invalid Request');
    return response.status(400).end('Invalid Webhook Request');
  }
});


function searchProduct (request, response) {
  let action = request.body.result.action; 
  let parameters = request.body.result.parameters; 
  let inputContexts = request.body.result.contexts; 
  let requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
  const app = new DialogflowApp({request: request, response: response});
  const actionHandlers = {
    'input.welcome': () => {
     
        response.send({
        speech: "hello welcome to  HalalBots."
    });
    
    },
	'input.types': () => {
      
        sendResponse('it is product ,ingredient ,menu or place ?'); 
     
    },
    'input.product_type':()=>
    {
    	sendResponse('Do you have the barcode?');
    };
'input.barcodehave':()=>
    {
    	sendResponse('Enter your barcode,Please');
    };
	
    'default': () => {
     
        let responseToUser = {
          
          speech: 'default else :This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
          text: 'default else :This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
        };
        sendResponse(responseToUser);
      
    }
  };
  if (!actionHandlers[action]) {
    action = 'default';
  }
  actionHandlers[action]();
   
  function sendResponse (responseToUser) {
    if (typeof responseToUser === 'string') {
      let responseJson = {};
      responseJson.speech = responseToUser; 
      responseJson.displayText = responseToUser; 
      response.json(responseJson); 
    } else {
      let responseJson = {};
      responseJson.speech = responseToUser.speech || responseToUser.displayText;
      responseJson.displayText = responseToUser.displayText || responseToUser.speech;
      responseJson.data = responseToUser.data;
      responseJson.contextOut = responseToUser.outputContexts;
      response.json(responseJson); 
    }
  }
}
