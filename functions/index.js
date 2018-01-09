

const functions = require('firebase-functions'); // Cloud Functions for Firebase library

exports.dialogflowFirebaseProduct = functions.https.onRequest((request, response) => {
 
  if (request.body.result) {
    searchProduct(request, response);
    console.log("Hello","Hello");
  } else if (request.body.queryResult) {
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
             case 'input.barcodehave':

             response.send({
        speech: "Please,Enter your barcode"
    });
            break;

        default:
            response.send({
                speech: "no action matched in webhook"
             //   barcodeSearch(request, response);
            });
    }

  }
 
function barcodeSearch(request, response)

{
	    console.log("Demo1","Demo1");


switch (request.body.queryResult.action) {
 //console.log("Demo1","Demo1");
       

        case 'input.barcodenumber':

  response.send({
        speech: "${params.barcode}your barcode is matched,Please wait for a second.We analys your ingredient"
    });

            break;

        default:
            response.send({
                speech: "no action matched in webhook11"
            });
    }

  }
