/*jshint node:true*/

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

var posts = [
  {
    id: 1,
    title: 'Banana',
    author: 1,
    body: "Great yellow fruit",
    date: new Date(2014,5,4,6,0,0)
  }, {
    id: 2,
    title: 'Apples',
    author: 1,
    body: "can be of almost any color",
    date: new Date(2014,5,4,6,0,0)
  }
];

var authors = [
  {
    id: 1,
    name: "Anton",
    posts: [1, 2]
  }
];

module.exports = function (app) {
  var express = require('express');
  var postsRouter = express.Router();


  postsRouter.get('/', function (req, res) {
      res.send({
      'posts': posts,
      'authors': authors
    });
  });

  postsRouter.post('/', function (req, res) {
    res.status(201).end();
  });

  postsRouter.get('/:id', function (req, res) {
    res.send({
      'posts': posts.find(function(post){
        return post.id == req.params.id;
      }),
      'authors': authors

    });
  });

  postsRouter.put('/:id', function (req, res) {
    res.send({
      'posts': {
        id: req.params.id
      }
    });
  });

  postsRouter.delete('/:id', function (req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/posts', require('body-parser').json());
  app.use('/api/posts', postsRouter);
};
