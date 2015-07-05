#!/usr/bin/env node
var main = require('./main');
var fs = require('fs');
var args = require('minimist')(process.argv.slice(2));
var logSymbols = require('log-symbols');
var doubleQuotes = args.q;
var definitions = args.d;
var shouldWeWrite = args.w;
var files = args._[0].split(',');
var options =  {
	definitions: definitions,
  doubleQuotes: doubleQuotes
};

files.forEach(file, function () {
  fs.readFile(file, function (err, data) {
  	var migrated = main(err, data, options);
    if (shouldWeWrite) {
      writeFile(file, data);
    } else {
      console.log(logSymbols.success + 'Success')
    }
  });
});

function writeFile(file, data) {
  fs.writeFile(file, data, function (err) {
     if (err) {
      console.log(logSymbols.error + 'failed to write file');
     } else {
      console.log(logSymbols.success + 'wrote file successfully');
     }
  });
}
