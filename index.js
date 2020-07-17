let postcss = require('postcss');
let canTargetAccess = require('./lib/filter');
let handleRule = require('./lib/translator');

module.exports = postcss.plugin('postcss-unify', (opts) => {
    opts = opts || {};
    const size = opts.deviceWidth || 700;
    return function (root) {
        if (!opts.context && (opts.test || opts.exclude || opts.include)) {
            console.log(
                'You should pass postcss [Context]' +
                'to specify/exclude directions or files'
            );
            console.log(
                'more information ' +
                'see: https://www.npmjs.com/package/postcss-loader'
            );
        }
        // 排除指定的文件
        if (opts.context && !canTargetAccess(opts)) return;
        root.walkRules((rule) => {
            handleRule(rule, size);
        });
    };
});
