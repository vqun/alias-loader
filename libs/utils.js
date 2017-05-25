function isObject(o) {
  return Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}

var assign = (function() {
  if(typeof Object.assign === 'function') {
    return Object.assign
  }
  return function(target, src) {
    if(isObject(target) && isObject(src)) {
      for(var k in src) {
        if(src.hasOwnProperty(k) && !target.hasOwnProperty(k)) {
          target[k] = src[k];
        }
      }
    }
    return target;
  }
})()

module.exports = {
  isObject: isObject,
  assign: assign
}