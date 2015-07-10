#!/usr/bin/env node
var main = require('./main');
var fs = require('fs');
var args = require('minimist')(process.argv.slice(2));
var logSymbols = require('log-symbols');
var doubleQuotes = args.q;
var definitions = args.d;
var shouldWeWrite = args.w;
var help = args.h || args.help;

if (help) {
  console.log(spitHelp());
  process.exit(0);
}

var files = args._[0].split(',').map(function (x) {
  // Append .js to all files even if they don't have one
  // And strip any extra whitespace
  return x.toString().trim().split(".js")[0] + ".js";
});;

if (definitions === true) {
  definitions = 'qunit';
}

if (doubleQuotes === true) {
  quotes = '"';
} else {
  quotes ='\'';
}

var options =  {
	definitions: definitions,
  quotes: quotes
};

files.forEach(function (file) {
  fs.readFile(file, function (err, data) {
    if (err) {
      console.log(logSymbols.error
                  + ' Failed to write for ' + file + '\n' + err);
      return err;
    }

  	var migrated = main(data.toString(), options);
    if (shouldWeWrite) {
      writeFile(file, migrated);
    } else {
      console.log(migrated);
      console.log(logSymbols.success + ' Success');
    }
  });
});

function writeFile(file, data) {
  fs.writeFile(file, data, function (err) {
     if (err) {
      console.log(logSymbols.error + ' failed to write file');
     } else {
      console.log(logSymbols.success + ' Wrote ' + file + 'successfully');
     }
  });
}

function spitHelp() {
  return 'QUnit Migrate\nMigrate your old QUnit code to new api.\n\n'
         + 'Usage: qunit-migrate "file1, file2, file3" -d -q -w\n\nOptions:\n'
         + '-w: If you want to write the output to file, default: false\n'

         + '-d: If you want definitions support, this will try to add QUnit deps to AMD definitions and anonymous requires.\n Keep in mind, qunit-migrate currently doesn\'t check if qunit definition is already present or not.\n'

        + '-q: If you want double quoutes support, by default we convert to single quotes';
}
