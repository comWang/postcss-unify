var postcss = require("postcss");
var filterTarget = require('./filter');

var handleRule = function (rule, size) {
  var SPACE = " ";
  var filter = /(width)|(height)|(margin)|(padding)|(left)|(right)|(top)|(bottom)|(font-size)|(radius)/;
  rule.walkDecls(filter, function (decl) {
    // 去除首尾空格和多余空格
    var value = decl.value.replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, SPACE);
    var perList = value.split(SPACE);
    var computed = "";
    if (perList.length === 0) {
      decl.value = "";
      return;
    } else if (perList.length === 1 && /^-?\d+$/.test(perList[0])) {
      decl.value =
        parseInt(perList[0], 10) === 0 ? 0 : (perList[0] * 100) / size + "vw";
      return;
    }
    computed = perList.reduce(function (accumulator, per) {
      if (/^-?\d+$/.test(per)) {
        accumulator += SPACE;
        accumulator += parseInt(per, 10) === 0 ? 0 : (per * 100) / size + "vw";
      } else {
        accumulator += SPACE + per;
      }
      return accumulator;
    }, "");
    // postcss会保留源格式。如果不去除第一个空格，在源文件有空格的情况下会变成2个空格
    decl.value = computed.slice(1, computed.length);
  });
};


module.exports = postcss.plugin("postcss-unify", function (opts) {
  opts = opts || {};
  var size = opts.deviceWidth || 700;
  return function (root) {
    if (!opts.context && (opts.test || opts.exclude || opts.include)) {
      console.log(
        "You should pass postcss [Context] to specify directions or files"
      );
      console.log(
        "more information see: https://www.npmjs.com/package/postcss-loader"
      );
    }
    // 排除指定的文件
    if (opts.context && filterTarget(opts)) return;
    root.walkRules(function (rule) {
      handleRule(rule, size);
    });
  };
});
