module.exports = function (data) {
  var assertions = [
    'ok', 'equal', 'notEqual',
    'propEqual', 'notPropEqual',
    'deepEqual', 'notDeepEqual',
    'strictEqual', 'notStrictEqual',
    'throws', 'expect'
  ];
  var assertPrefix = 'assert.';
  var result = data;

  assertions.map(function (assertion) {
    var regex = new RegExp('' + assertion + '\\(', 'g');
    var replacement = assertPrefix + assertion + '(';
    result = result.replace(regex, replacement);
  });

  return result;
}
