const path = require('path');
const assert = require('power-assert');
const filter = require('./../lib/filter');

/**
 *
 * @param {String} pathStr 文件的绝对路径
 * @param {Object} options 向插件传递的参数
 * @param {Boolean} isPassed  该文件能否通过过滤（即文本内容是否可以被插件处理）
 * test, include, exclude优先级递增
 */
const run = (pathStr, options, isPassed) => {
    const canTargetAccess = filter({
        context: {
            file: (() => pathStr ? { dirname: pathStr } : undefined)()
        },
        test: options.test,
        include: options.include,
        exclude: options.exclude
    });
    assert.strictEqual(canTargetAccess, isPassed);
};

describe('Filter', () => {
    // deal with empty
    it('1', () =>
        run(
            undefined,
            {
                test: /.*(\/|\\)src(\/|\\).*/
            },
            true
        ));
    it('2', () => {
        const canTargetAccess = filter({
            context: {
                file: {}
            },
            test: /.*(\/|\\)src(\/|\\).*/
        });
        assert(canTargetAccess === true);
    });
    it('3', () =>
        run(
            path.resolve(__dirname, 'node_modules', 'src', 'some'),
            {
                test: /.*(\/|\\)src(\/|\\).*/
            },
            true
        ));

    it('4', () =>
        run(
            path.resolve(__dirname, 'node_modules', 'src', 'some'),
            {
                test: /.*(\/|\\)src(\/|\\).*/,
                exclude: 'node_modules'
            },
            false
        ));

    it('5', () =>
        run(
            path.resolve(__dirname, 'node_modules', 'src', 'some'),
            {
                test: /.*(\/|\\)src(\/|\\).*/,
                include: ['src', 'some']
            },
            true
        ));

    it('6', () =>
        run(
            path.resolve(__dirname, 'node_modules', 'src', 'some'),
            {
                test: /.*(\/|\\)src(\/|\\).*/,
                include: ['src', 'some'],
                exclude: 'node_modules'
            },
            false
        ));

    it('7', () =>
        run(
            path.resolve(__dirname, 'node_modules', 'framework', 'some'),
            {
                exclude: 'node_modules'
            },
            false
        ));

    it('8', () =>
        run(
            path.resolve(__dirname, 'src', 'folder', 'componentA'),
            {
                include: ['src', 'componentA']
            },
            true
        ));
    it('9', () =>
        run(
            path.resolve(__dirname, 'src', 'folder', 'componentA'),
            {
                include: 'componentB'
            },
            false
        ));
});
