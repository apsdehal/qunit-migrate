var main = require('./main');
var fs = require('fs');
var args = process.argv;
var file = args[2];

fs.readFile(file, main);
