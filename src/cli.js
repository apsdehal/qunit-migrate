var program = require('commander');
var glob = require('glob');

program
  .version('2.0.0')
  .usage('[options] <file ...>\n\n  QUnit Migrate: A tool to migrate your files to QUnit 2.0 API')
  .option('-c, --config <path>', 'Config file for qunit-migrate')
  .option('-w, --write', 'Pass if parsed files should be overwritten. Default: false')
  .option('-p, --preset <string>', 'Preset rule for jscs config. Default: jquery')
  .option('-j, --no-jscs', 'Pass if jscs fix should not be applied. Default: true')

program.on('--help', function(){
  console.log('  Globbing is supported in files')
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('    $ qunit-migrate "./**/*.js" -w --preset "google" -c "config.json"');
  console.log('');
  console.log('  By Amanpreet Singh <@apsdehal>');
  console.log('');
});

program.parse(process.argv);

console.log(program.config);
console.log(program.write);
console.log(program.preset);
console.log(program.jscs);
console.log(program.args);
