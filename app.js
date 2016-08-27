/*
 * Module dependencies
 */
var express = require('express')
, stylus = require('stylus')
, nib = require('nib')
, morgan = require('morgan')
, path = require('path')
, fs = require('fs')
, _ = require('lodash')
, tools = require('./tools')

var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
    , compile: compile
  }
))
app.use(express.static(path.join(__dirname + '/public')))

app.get('/', function (req, res) {
  res.render('index');
})

app.get('/projects', function (req, res) {
  res.render('projects');
})

app.get('/coding', function (req, res) {
  res.render('coding');
})

app.get('/research', function (req, res) {
  res.render('research');
})

app.get('/text/page/:pagename', function (req, res) {
  res.send(tools.LoadAndParseCodingBlogEntry(req.params.pagename));
})

app.get('/text/pagedata', function (req, res) {
  res.send(tools.GetBlogEntryData());
})

app.listen(3000, '0.0.0.0', function() {
  console.log('Listening to port:  ' + 3000);
});
