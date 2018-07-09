#!/usr/bin/env node


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

let Numbers = require('./models/number')

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/numadder', {useNewUrlParser: true});
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log(err);
});

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view options', {layout: false});
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

// index
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Index'
  });
});

app.get('/numbers', (req, res) => {
  let numbers = Numbers.find({}, (err, numbers) => {
    if (err)
      console.log(err);
    else {
      res.render('numbers', {
        numbers: numbers
      });
    }
  });
});

app.post('/numbers', (req, res) => {
  let numbers = new Numbers();
  numbers.number = req.body['number'];
  numbers.value = req.body['value'];
  numbers.description = req.body['description'];
  numbers.save((err) => {
    if (err)
      console.log(err);
    else
      res.sendStatus(200);
  });
});

app.delete('/numbers/:id', (req, res) => {
  let query = {_id: req.params.id};
  Numbers.remove(query, (err) => {
    if (err)
      console.log(err);
    else
      res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}...`);
});
