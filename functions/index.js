

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
var admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
//var firebasedata = admin.firebase();

// var firebase = require("firebase");
// var ref = new Firebase("https://newagent-79cf2.firebaseio.com");
// var config = {
//     apiKey: "AIzaSyCdb1HzXA3aBH6udAJsVRQPCD5FjkOsCX4",
//     authDomain: "newagent-79cf2.firebaseapp.com",
//     databaseURL: "https://newagent-79cf2.firebaseio.com",
//     projectId: "newagent-79cf2",
//     storageBucket: "newagent-79cf2.appspot.com",
//     messagingSenderId: "688728226903"
//   };
//  firebase.initializeApp(config);
// var rootRef = firebase.database().ref();
exports.dialogflowFirebaseProduct = functions.https.onRequest((request, response) => {
 // let pro=request.body.result;
 // let barcodedata=request.body.result;
  if (request.body.result) {
  	
    searchProduct(request, response);
    console.log("Hello",request.body.result.action);
  } 
  else if (request.body.queryResult) {
  	console.log("Hello1",request.body.queryResult);
    barcodeSearch(request, response);
        console.log("Hello1","Hello1");

  } else {
    console.log('Invalid Request');
    return response.status(400).end('Invalid Webhook Request');
  }
});


function searchProduct (request, response) {
	    console.log("Demo","Demo");


switch (request.body.result.action) {
 //console.log("Demo1","Demo1");
        case 'input.welcome':

             response.send({
        speech: "hello welcome to  HalalBots."
    });
            break;

        case 'input.types':

  response.send({
        speech: "it is product ,ingredient or place"
    });

            break;
           
  

        default:
         barcodeSearch(request, response);

            // response.send({
            //     speech: "no action matched in webhook"
            // });
    }

  }
 
function barcodeSearch(request, response)

{
	    console.log("Demo1","Demo1");
 // let action = (request.body.queryResult.action) ? request.body.queryResult.action : 'default';


switch (request.body.queryResult.action) {
 //console.log("Demo1","Demo1");
         case 'input.barcodehave':

             response.send({
        speech: "Please,Enter your barcode"
    });
            break;

        case 'input.barcodenumber':
       // let params = request.body.queryResult.parameters;

  response.send({
  	speech:"barcode is matched"
        // speech: "${params.barcode}your barcode is matched,Please wait for a second.We analys your ingredient"
    });

            break;

        default:
            response.send({
                speech: "no action matched in webhook11"
            });
    }

  }
