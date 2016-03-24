var constants = require('../constants');

var assertions = [
  constants.okAssertion,
  constants.notOkAssertion,
  constants.equalAssertion,
  constants.notEqualAssertion,
  constants.strictEqualAssertion,
  constants.notStrictEqualAssertion,
  constants.deepEqualAssertion,
  constants.notDeepEqualAssertion,
  constants.propEqualAssertion,
  constants.notPropEqualAssertion,
  constants.throwsAssertion,
  constants.raisesAssertion,
  constants.expectAssertion
];

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;

  return node.type === 'Identifier' &&
         assertions.indexOf(node.name) > -1 &&
         parent &&
         parent.node &&
         parent.node.type === 'CallExpression';
};
