var chalk = require('chalk');
var glob = require('glob');
var Checker = require('jscs');
var exit = require('exit');
var fs = require('fs');
var glob = require('glob');
var extend = require('extend');
var logSymbols = require('log-symbols');

var data, parsedCode, checker, parser;

module.exports = function (config) {
  extend(config, {
    files: config.files || [],
    write: config.write || false,
    jscs: config.jscs,
    parser: config.parser || 'ast',
    preset: config.preset || 'jquery'
  });

  if (typeof config.jscs === 'undefined') {
    config.jscs = true;
  }

  try {
    parser = require('./' + config.parser);
  } catch (e) {
    console.log(logSymbols.error + ' ' +
      chalk.bold.red('Failed to load parser: %s'), config.parser);
    console.log(logSymbols.info,
      chalk.bold.yellow('Info: Parser should be either ast/regex'));
    console.log(e.toString());
    exit();
  }

  if (config.files.length === 0) {
    console.log(logSymbols.error, chalk.bold.red('No files passed!'));
    console.log(logSymbols.info, chalk.bold.yellow('Use -h for help'));
    exit();
  }

  if (config.jscs) {
    checker = new Checker();
    var jscsConfig = config.jscsConfig || {};
    extend(jscsConfig, {
      preset: config.preset,
      fix: true
    });

    checker.registerDefaultRules();
    checker.configure(jscsConfig);
  }

  if (Array.isArray(config.files)) {
    parseFiles(null, config.files);
  } else {
    glob(config.files, parseFiles);
  }


  function parseFiles(error, files) {
    if (error) {
      console.log(logSymbols.error, chalk.bold.red('Error in Globbing pattern!'));
      console.log(error.toString());
      exit();
    }

    var errors = [], passed = [];

    files.forEach(function (file) {
      try {
        data = fs.readFileSync(file);
        parsedCode = parser(data);

        if (config.jscs) {
          parsedCode = checker.fixString(parsedCode);
          parsedCode = parsedCode.output;
        }

        if (config.write) {
          fs.writeFileSync(file, parsedCode);
        } else {
          console.log(logSymbols.success +
            ' ' + chalk.bold.green('Output for %s:\n'), file);
          console.log(parsedCode);
        }

        passed.push(file);
      } catch (e) {
        console.log(logSymbols.error + ' ' +
          chalk.bold.red('Error occured while fixing file: %s'), file);

        console.log(e.toString());
        errors.push(file);
      }
    });

    if (errors.length) {
      console.log(chalk.bold.red('Following files were not converted:'));
      errors.forEach(function (error) {
        console.log(logSymbols.error, chalk.red(error));
      });
    }

    if (passed.length) {
      console.log(chalk.bold.green('Following files were successfully converted:'));
      passed.forEach(function (pass) {
        console.log(logSymbols.success, chalk.green(pass));
      });
    }
  }
};
