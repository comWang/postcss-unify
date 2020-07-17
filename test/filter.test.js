const path = require('path');
const assert = require('power-assert');
const filter = require('./../lib/filter');

/**
 *
 * @param {String} path 文件的绝对路径
 * @param {Object} options 对路径的匹配模式
 * @param {Boolean} isNotFiltered  test，include匹配成功且exclude匹配失败的路径，不会被过滤
 * test, include, exclude优先级递增
 */
const run = (pathStr, options, isNotFiltered) => {
    const isFiltered = filter({
        context: {
            file: (() => pathStr ? { dirname: pathStr } : undefined)()
        },
        test: options.test,
        include: options.include,
        exclude: options.exclude
    });
    assert.strictEqual(isFiltered, !isNotFiltered);
};

describe('Filter specific files', () => {
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
        const isFiltered = filter({
            context: {
                file: {}
            },
            test: /.*(\/|\\)src(\/|\\).*/
        });
        assert(isFiltered === false);
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
