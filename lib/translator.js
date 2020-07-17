module.exports = function (rule, size) {
    const SPACE = ' ';
    // eslint-disable-next-line
    const filter = /(width)|(height)|(margin)|(padding)|(left)|(right)|(top)|(bottom)|(font-size)|(border)/;
    rule.walkDecls(filter, decl => {
        // 去除首尾空格和多余空格
        const originValue = decl.value
            .replace(/^\s+|\s+$/g, '')
            .replace(/\s{2,}/g, SPACE);
        const placeholder = originValue.match(/\w+\(.*\)/i);
        const value = originValue.replace(/\w+\(.*\)/i, 'PLACEHOLDER');
        const perList = value.split(SPACE);
        let computed = '';
        if (perList.length) {
            computed = perList.reduce((accumulator, per) => {
                if (/^-?\d+$/.test(per)) {
                    accumulator += SPACE;
                    accumulator +=
                        parseInt(per, 10) === 0 ? 0 : per * 100 / size + 'vw';
                } else {
                    accumulator += SPACE + per;
                }
                return accumulator;
            }, '');
        }
        if (placeholder) {
            computed = computed.replace('PLACEHOLDER', placeholder[0]);
        }
        // postcss会保留源格式。如果不去除第一个空格，在源文件有空格的情况下会变成2个空格
        decl.value = computed.slice(1, computed.length);
    });
};
