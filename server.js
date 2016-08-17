// import mongoose
const mongoose = require('mongoose');
const express = require('express');

// get necesary variables from mongose and express
const db = mongoose.connection;
const Schema = mongoose.Schema;
const app = express();

// connect to the database 'kitten_tests'
mongoose.connect('mongodb://localhost/kitten_tests');

// updating mongoose promises
mongoose.Promise = global.Promise;

// check for conection status
db.on('error', console.error.bind(console, 'conection error'));
db.once('open', function() {console.log('Connected to DB!')} );

// creating the Schema
const kittySchema = Schema({
    name: String
});

kittySchema.methods.speak = function(){
  var greetings = this.name ? "Meow name is " + this.name : "I am a dog... WTF???";
  console.log(greetings);
};

// compiling the Schema
var Kitten = mongoose.model('Kitten', kittySchema);


app.get("/", (req, res) => {
  res.end('<h1>HELLO</h1>');
})

app.get("/find", (req, res) => {
  Kitten.find()
     .then( (records) => res.end(`<p>${records}</p>`))
     .catch( (e) => console.log(e.message));
});

app.listen(9999, () => console.log("listening..."));

// creating and testing the kitty
// var pluto = new Kitten({name: 'Max'});
// pluto.speak();

// saving the kitty in the DB
// pluto.save().then( () => console.log(`The record ${pluto.name} was added`));

// Kitten.findByIdAndRemove('57b3b6739f09ffa80c114905')
//   .then(() => console.log('removed'));

// Kitten.find()
//   .then( (records) => console.log(records))
//   .catch( (e) => console.log(e.message));

Kitten.find({ name: /^P/ })
  .then( (result) => console.log(result))
  .catch( (e) => console.log(e.message));
