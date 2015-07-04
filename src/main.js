var assertionModifier = require('modifiers/assertion');

module.exports = function (err, data) {
  if (err) {
    console.log(err);
    return err;
  }

  data = assertionModifier(data);
}
