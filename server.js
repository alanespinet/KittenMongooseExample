// import mongoose
const mongoose = require('mongoose');

// get necesary variables from mongose
const db = mongoose.connection;
const Schema = mongoose.Schema;

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
