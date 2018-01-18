const functions = require('firebase-functions');
//var axios =require('axios');
const admin = require('firebase-admin');
var firebase =require('firebase');
var Promise = require('promise');
const express = require("express");
var HalalDemo= express()
admin.initializeApp(functions.config().firebase);
var config = {
    
    databaseURL: "https://newagent-79cf2.firebaseio.com",
   // serviceAccount:"E:/AIProject/HalalFirabaseProject/functions/functions/NewAgent-4b8e8080cd01.json"
    
  };
  firebase.initializeApp(config);
  var swapiRef=firebase.database().ref('external');
  var keyLink= swapiRef.toString()+'.json?shallow=true';
  console.log("Demo Code",keyLink);

  swapiRef.once('value').then(function(snapshot) {
  	console.log("promises was fulfilled",snapshot.val());
  // The Promise was "fulfilled" (it succeeded).
 // renderBlog("demo renderBlog",snapshot.val());
  var keys=Object.keys(snapshot.val());
	var promises=[];
	keys.forEach(function(key)
		{
promises.push(swapiRef.child(key).once('value'));
			console.log("Data",snapshot.val());
		});

	return Promise.all(promises).then(function(values)
		{
			return new Promise(function(resolve,reject)
	{
		setTimeout(function()
		{
			console.log("waited for 5 sec");
			resolve(values);
			console.log("After Wait",values.length);
		},500
		);
	});
		});
}, function(error) {
  // The Promise was rejected.
  console.log("rejected");
  console.error(error);
});

  HalalDemo.get('/', function (req, res) {
  res.send('Hello World')
})
 
const HalalFirabaseProject = functions.https.onRequest(HalalDemo)

module.exports = {
 HalalFirabaseProject
}


