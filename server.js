var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var mongodb = require('mongodb');

var uri = 'mongodb://amarcontact:amarcontact@ds135577.mlab.com:35577/contactlist';

//var uri = 'mongodb://rakesh:rakesh@ds137197.mlab.com:37197/testdata';

// Create seed data

app.use(bodyParser.json());

mongodb.MongoClient.connect(uri, (err, database) => {
  if (err) return console.log(err)
  myDB = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


var db = mongojs('contactlist', ['contactlist']);

var port = process.env.PORT || 3000;
/*app.get('/', function(req, res){
	res.send("Hellow world server.js");
});
*/

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
 
  
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})


app.get('/contactlist', function(req,res){
	console.log("I received a Get request from server");
	 myDB.collection('contactlist').find().toArray(function(err, results) {
          console.log(results)
          // send HTML file populated with quotes here
        })
	myDB.collection('contactlist').find().toArray(function(err, docs){
		//console.log(docs);
		res.json(docs);
	});
});



app.post('/contactlist', function(req,res){

	myDB.collection('contactlist').save(req.body, function(err,doc){
		res.json(doc);
	});
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	myDB.collection('contactlist').remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id=req.params.id;
	
	myDB.collection('contactlist').findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
		console.log(doc);
		res.json(doc);
	})
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log("put server" + id);
	console.log(req.body.name);
	// myDB.collection('contactlist').findAndModify({query: {_id: mongojs.ObjectId(id)},
	// 	update: {$set:{name:req.body.name, email: req.body.email, 
	// 		number: req.body.number}},
	// 	new: true}, function(err, doc){
	// 		res.json(doc)
	// 	})

	myDB.collection('contactlist').update(
		{_id : mongojs.ObjectId(id)},
		{$set: {name:req.body.name, email: req.body.email, number: req.body.number}},
		{multi: false}
	, function(err, doc){
		res.json(doc);
	})
})

