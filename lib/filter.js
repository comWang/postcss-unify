// FilterTypes
const TEST = 'test';
const INCLUDE = 'include';
const EXCLUDE = 'exclude';

/**
 *
 * @param {String} str 需要匹配的字符串
 * @param {PathString} comparedPath 在该路径下匹配str
 * @param {FilterType} method 匹配方式
 * @return 是否过滤携带有str的路径
 */
const isStringFilterd = (str, comparedPath, method) => {
    const stringifyPath = encodeURIComponent(comparedPath);
    const stringifyPathStr = encodeURIComponent(str);
    if (method === TEST || method === INCLUDE) {
        return !stringifyPath.match(stringifyPathStr);
    }
    if (method === EXCLUDE) {
        // 转换成布尔值
        return !!stringifyPath.match(stringifyPathStr);
    }
    return false;
};

const isRegExpFilterd = (reg, comparedPath, method) => {
    if (method === TEST || method === INCLUDE) {
        return !reg.test(comparedPath);
    }
    if (method === EXCLUDE) {
        return reg.test(comparedPath);
    }
    return false;
};

const isDataFiltered = (data, comparedPath, method) => {
    const type = Object.prototype.toString.call(data);
    const STRING = '[object String]';
    const REGEXP = '[object RegExp]';
    const ARRAY = '[object Array]';
    switch (type) {
    case STRING:
        return isStringFilterd(data, comparedPath, method);
    case REGEXP:
        return isRegExpFilterd(data, comparedPath, method);
    case ARRAY:
        const filteredCount = data.reduce((accu, per) => {
            if (isDataFiltered(per, comparedPath, method)) return accu + 1;
            return accu;
        }, 0);
        return filteredCount === data.length && true || false;
    default:
        break;
    }
    return false;
};

module.exports = function (opts) {
    if (
        (!opts.context || !opts.context.file || !opts.context.file.dirname) &&
        (opts.test || opts.include || opts.exclude)
    ) {
        console.log(
            'Anything will be compiled because ' +
            'option [Context.file.dirname] not found.'
        );
    }
    if (!opts.context || !opts.context.file || !opts.context.file.dirname) {
        return true;
    }
    const { dirname } = opts.context.file;
    const test = opts.test;
    const include = opts.include;
    const exclude = opts.exclude;
    let isPassed = true;
    // 不用else是因为按照test, include, exclude的匹配优先级覆盖结果
    if (isDataFiltered(test, dirname, TEST)) isPassed = false;
    if (isDataFiltered(include, dirname, INCLUDE)) isPassed = false;
    if (isDataFiltered(exclude, dirname, EXCLUDE)) isPassed = false;
    return isPassed;
};
