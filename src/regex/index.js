var main = require('./main');
var options =  {
	definitions: false,
  quotes: '"'
};

module.exports = function (data) {
	var migrated = main(data.toString(), options);
  return migrated;
}

