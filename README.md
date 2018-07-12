# Simple number adder HTML page

* Uses Node.js and jQuery to create a simple number adder
* Mainly to practice using [Node.js](https://nodejs.org/en/) and related libraries:

  - [Express](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/)
  - [Pug](https://pugjs.org/api/getting-started.html)

# To run

```bash
npm install
brew services start mongodb

# You may have to initialize and populate the database, I haven't tested this yet
mongo
# You will be dropped in to the MongoDB shell
# Basically execute what is in `./mongo.txt`
> cls
> show dbs
> use numadder
> db.createCollection('numbers');
> show collections

> db.numbers.insert({number: 'One', value: 1, description: 'the first natural number'});
> db.numbers.insert({number: 'Two', value: 2, description: 'the second natural number'});
> db.numbers.find().pretty();
> db.numbers.insert({number: 'Three', value: 3, description: 'the third natural number'});
> quit()

npm run dev  # ^C to quit
# Navigate to http://127.0.0.1:3000 in a web browser (unless you set $PORT!)

# after quitting...
brew services stop mongodb
```

# TODO
* Click on row and direct to editing page
* Restore deleted row within 10 seconds of deletion
