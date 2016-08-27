var fs = require('fs-extra'),
    marked = require('marked'),
    _ = require('lodash'),
    path = require('path');

function LoadFile(filename) {
  return fs.readFileSync("Blogs/Coding/" + filename, "UTF8");
}

function LoadAndParseCodingBlogEntry(filename) {
  var filestring = LoadFile(filename);
  
  return marked(filestring);
}

function GetBlogEntryData() {
  var filenames = fs.readdirSync("Blogs/Coding");
  filenames = _.filter(filenames, function(filename) {return path.extname(filename) === ".json"});
  var filestrings = _.map(filenames, LoadFile);
  var fileobjects = _.map(filestrings, JSON.parse);
  fileobjects = _.orderBy(fileobjects, function(o) {return new Date(o.date);}, 'desc');
  return fileobjects;
}

module.exports = {
  LoadFile: LoadFile,
  LoadAndParseCodingBlogEntry: LoadAndParseCodingBlogEntry,
  GetBlogEntryData: GetBlogEntryData
};
