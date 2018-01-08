const functions = require('firebase-functions');

exports.searchProduct = functions.https.onRequest((request, response) => {

	console.log("request.body.result.parameters:",request.body.result.parameters);


switch (request.body.result.action) {

        case 'input.welcome':

             response.send({
        speech: "hello welcome to  HalalBots."
    });
            break;

        case 'input.types':

  response.send({
        speech: "it is product ,ingredient ,menu or place ?"
    });



            break;
             case 'input.product_type':

  response.send({
        speech: "Do you have the barcode ?"
    });



            break;

            case 'input.barcodehave':

  response.send({
        speech: "Please,Enter your barcode"
    });
 break;

   case 'input.barcodenumber':
        let params = request.body.result.parameters;

  response.send({
       speech:  `${params.barcode}your barcode is matched,Please wait for a second.We analys your ingredient`
    });
 break;

 case 'input.ingredient':
        let params1 = request.body.result.parameters;

  response.send({
        speech:  `${params1.meat1}Happy to know your product is halal`
    });
 break;

 case 'input.noproducttype':
        let params2 = request.body.result.parameters;

  response.send({
        speech:  `${params2.nobarcodefound}No product found please either enter your brand name or product name`
    });
 break;

case 'input.brandname':
        let params3 = request.body.result.parameters;

  response.send({
        speech:  `${params3.BrandName}your product is found,Please wait for a second.We analys your ingredient` 
    });
 break;

 case 'input.lotsofproduct':
       // let params4= request.body.result.parameters;

  response.send({
        speech:  `Lots of product found`
    });

  case 'input.brandname':
        let params4= request.body.result.parameters;

  response.send({
        speech: `${params4.BrandName}your product is foundPlease wait for a second.We analys your ingredient`
    });
 break;
 case 'input.menu':
        
  response.send({
        speech: `Please enter your Ingredient`
    });
 break;

 case 'input.place':
        
  response.send({
        speech: `Work in progress`
    });
 break;

 case 'input.nobarcode':
        
  response.send({
        speech: `Either enter your BrandName or Product Name`
    });
 break;

 case 'input.sure':
        
  response.send({
        speech: `Your ingredient list is match,So Your Product is halal`
    });
 break;

        default:
            response.send({
                speech: "no action matched in webhook"
            })
    }
});




