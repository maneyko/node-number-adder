#!/usr/bin/env node


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view options', {layout: false});
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));

// index
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Index'
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
