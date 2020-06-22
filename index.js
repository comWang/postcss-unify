var postcss = require('postcss');

module.exports = postcss.plugin('postcss-unify', function (opts) {
    opts = opts || {};
    var size = opts.deviceWidth || 700;
    return function (root) {
        root.walkRules(function (rule) {
            var filter = /(width)|(height)|(margin)|(padding)|(left)|(right)|(top)|(bottom)|(font-size)|(radius)/;
            rule.walkDecls(filter, function (decl) {
                // 去除首尾空格
                var value = decl.value.replace(/^\s+|\s+$/g, '');
                var perList = value.split(' ');
                var computed = '';
                var SPACE = ' ';
                if (perList.length === 0) {
                    decl.value = '';
                    return;
                } else if (perList.length === 1 && /^-?\d+$/.test(perList[0])) {
                    decl.value = parseInt(perList[0], 10) === 0
                        ? 0
                        : perList[0] * 100 / size + 'vw';
                    return;
                }
                computed = perList.reduce(function(accumulator, per) {
                    if (/^-?\d+$/.test(per)) {
                        accumulator += SPACE;
                        accumulator += parseInt(per, 10) === 0
                            ? 0
                            : (per * 100 / size + 'vw');
                    } else {
                        accumulator += SPACE + per;
                    }
                    return accumulator;
                }, '')
                decl.value = computed;
            });
        });
    };
});
