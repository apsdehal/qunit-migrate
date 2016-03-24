var path = require('path');

module.exports = {
  getHyphenedNameFromCamelCase: function (rule) {
    return rule.replace(/([A-Z])/g,
      function (str) { return "-" + str.toLowerCase() }) + '.js';
  },

  getCamelCaseFromHyphenedName: function (filename) {
    var tokens = filename.split('-');
    var camelCasedName = tokens.shift();
    tokens.map(function (x) {
      camelCasedName += x.charAt(0).toUpperCase() + x.slice(1);
    });

    return camelCasedName;
  },

  checkIfNodeParamsContain: function (node, param) {
    var len = node.params.length;
    for (var i = 0; i < len; i++) {
      if (node.params[i].name === param) {
        return true;
      }
    }
    return false;
  }
};
