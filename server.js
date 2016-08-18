// imports
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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

// setting up the middle-ware. You don't call 'next()' because bodyParser and
// cors already call it inside them
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// creating a simple Schema
const bookSchema = Schema({
  title: String,
  author: String,
  category: String
});


// creating the model from the bookSchema
const Book = mongoose.model('Book', bookSchema);


// creating the routes

// POST
app.post('/books', (req, res) =>{
  const newBook = new Book(req.body);
  newBook.save()
    .then(savedBook => res.json(savedBook))
    .catch(e => console.log('Error: ', e.message));
});


// GET
app.get('/findall', (req, res) => {
  Book.find()
  .then(records => res.end(`<p>${records}</p>`))
  .catch(e => console.log('Error: ', e.message));
});


// GET ONE
app.get('/findone/:id', (req, res) => {
  Book.findById(req.params.id)
  .then(records => res.end(`<p>${records}</p>`))
  .catch(e => console.log('Error: ', e.message));
});

// PUT
app.put('/update/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(record => {
      Object.assign(record, req.body);

      record.save()
        .then(savedBook => res.json(savedBook))
        .catch(e => console.log('Error: ', e.message));
    })
    .catch(e => console.log('Error: ', e.message));
});

// DELETE
app.put('/delete/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id)
  .then(savedBook => res.json(savedBook))
  .catch(e => console.log('Error: ', e.message));
});

app.listen(3000, () => console.log('Server listening at port 3000'));
