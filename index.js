var path = require('path')
var loaderUtils = require('loader-utils');
var utils = require('./libs/utils')

var assign = utils.assign, isObject = utils.isObject

// /(?:import|export)\s+\{?(?:([\w_*$]+),)*(?:[\w_*$]+)\}?\s+from/

var IMPORT_REG = /(?:@import|require|from|import)(?:\(|\s*)(\'|\")([^\s\1]+)\1(?:\)|\s*);?/gmi

module.exports = function(source) {
  this.cacheable();
  var query = assign(loaderUtils.parseQuery(this.resourceQuery || '?'), loaderUtils.parseQuery(this.query || '?'));
  
  var alias = query && query.alias || (this.options.resolve || {}).alias

  if (!isObject(alias)) {
    return source
  }

  var result, resolved = '', lastIndex = 0
  while(result = IMPORT_REG.exec(source)) {
    var s = result[2], m = result[0]
    for(var k in alias) {
      if(alias.hasOwnProperty(k) && s.indexOf(k) === 0) {
        resolved = resolved + source.slice(lastIndex, result.index)
        lastIndex = result.index + m.length
        resolved = resolved + m.replace(k, path.relative(this.context, alias[k]))
        break
      }
    }
  }
  resolved = resolved + source.slice(lastIndex)

  return resolved
}