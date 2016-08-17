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


// creating the Schemas
const personSchema = Schema({
  _id: Number,
  name: String,
  age: Number,
  stories: [ {type: Number, ref: 'Story'} ]
});

const storySchema = Schema({
  title: String,
  creator: {type: Number, ref: 'Person'},
  fans: [ {type: Number, ref: 'Person'} ]
});


// compiling the Schemas
const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);


// variables
const alejandro = new Person({
  _id: 0,
  name: 'Alejandro Dumas',
  age: 50,
});

const condeMonteCristo = new Story({
  title: 'El Conde de Montecristo',
  creator: alejandro.id
});

// save the values
// alejandro.save().then( () => console.log('saved'));
// condeMonteCristo.save().then( () => console.log('saved'));

// Story.find()
//       .populate('creator')
//       .then( (records) => console.log(records) )
//       .catch( (e) => console.log(e.message));

app.get("/", (req, res) => {
  res.end('<h1>HELLO</h1>');
})

app.get("/find", (req, res) => {
  Story.find()
     .populate('creator')
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
