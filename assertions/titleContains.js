exports.assertion = function(expected, msg) {
  this.expected = function() {
    return this.negate ? `not contains '${expected}'` : `contains '${expected}'`;
  };