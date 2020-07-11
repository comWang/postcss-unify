var isRegExp = function (a) {
  return Object.prototype.toString.call(a) === "[object RegExp]";
};
var isString = function (a) {
  return typeof a === "string";
};
var isArray = function (a) {
  return Object.prototype.toString.call(a) === "[object Array]";
};

module.exports = function (opts) {
  var dirname = opts.context.file.dirname,
    test = opts.test,
    include = opts.include,
    exclude = opts.exclude,
    isBreaking = false;
  // test, include, exclude优先级依次递增
  if (isRegExp(test) && !test.test(dirname)) isBreaking = true;
  else if (isArray(test)) {
    var matchCount = test.reduce(function (accumulator, reg) {
      if (reg.test(dirname)) accumulator++;
      return accumulator;
    }, 0);
    if (!matchCount) isBreaking = true;
  }

  if (
    isString(include) &&
    !encodeURIComponent(dirname).match(encodeURIComponent(include))
  )
    isBreaking = true;
  else if (isArray(include)) {
    matchCount = include.reduce(function (accumulator, str) {
      if (
        isString(str) &&
        encodeURIComponent(dirname).match(encodeURIComponent(str))
      )
        accumulator++;
      return accumulator;
    }, 0);
    if (!matchCount) isBreaking = true;
  }

  if (
    isString(exclude) &&
    encodeURIComponent(dirname).match(encodeURIComponent(exclude))
  )
    isBreaking = true;
  else if (isArray(exclude)) {
    matchCount = exclude.reduce(function (accumulator, str) {
      if (
        isString(str) &&
        encodeURIComponent(dirname).match(encodeURIComponent(str))
      )
        accumulator++;
      return accumulator;
    }, 0);
    if (matchCount) isBreaking = true;
  }
  return isBreaking;
};
