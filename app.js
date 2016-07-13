/*
 * Module dependencies
 */
var express = require('express')
, stylus = require('stylus')
, nib = require('nib')
, morgan = require('morgan')
, path = require('path');

var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
    .use(bootstrap());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(morgan('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
    , compile: compile
  }
))
app.use(express.static(path.join(__dirname + '/public')))

app.get('/', function (req, res) {
  res.render('index',
	     { title : 'Home' }
	    )
})

app.listen(3000, '0.0.0.0', function() {
  console.log('Listening to port:  ' + 3000);
});
