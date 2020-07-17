const postcss = require('postcss');
const assert = require('power-assert');
const plugin = require('./../index');

function run(input, output, opts) {
    return postcss([plugin(opts)])
        .process(input)
        .then(result => assert.strictEqual(result.css, output));
}

describe('Translate', () => {
    it('1', () => {
        return run('.a{ width:75 }', '.a{ width:75vw }', {
            deviceWidth: 100
        });
    });

    it('2', () => {
        return run(
            '.a{ width: 20px; height: 30 }',
            '.a{ width: 20px; height: 30vw }',
            {
                deviceWidth: 100
            }
        );
    });

    it('3', () => {
        return run(
            '.a{ padding-left: 20; padding-right: 30px }',
            '.a{ padding-left: 20vw; padding-right: 30px }',
            { deviceWidth: 100 }
        );
    });

    it('4', () => {
        return run(
            '.a{ padding: 10 20 30px 0 }',
            '.a{ padding: 10vw 20vw 30px 0 }',
            { deviceWidth: 100 }
        );
    });

    it('5', () => {
        return run(
            '.a{ padding: 10 20 30px 0 }',
            '.a{ padding: 10vw 20vw 30px 0 }',
            { deviceWidth: 100 }
        );
    });

    it('6', () => {
        return run(
            '.a{ margin: 20 30px 40 50px }',
            '.a{ margin: 20vw 30px 40vw 50px }',
            { deviceWidth: 100 }
        );
    });

    it('7', () => {
        return run('.a{ font-size: 16 }', '.a{ font-size: 16vw }', {
            deviceWidth: 100
        });
    });

    it('8', () => {
        return run('.a{ font-size: 16px }', '.a{ font-size: 16px }', {
            deviceWidth: 100
        });
    });

    it('9', () => {
        return run('.a{ border-width: 6 }', '.a{ border-width: 6vw }', {
            deviceWidth: 100
        });
    });

    it('10', () => {
        return run(
            '.a{ top: 50; min-width: 400; min-height: 600px }',
            '.a{ top: 50vw; min-width: 400vw; min-height: 600px }',
            { deviceWidth: 100 }
        );
    });

    it('11', () => {
        return run(
            '.a{ margin:   10    30    40    50; }',
            '.a{ margin:   10vw 30vw 40vw 50vw; }',
            { deviceWidth: 100 }
        );
    });
});

describe('Translate advanced', () => {
    it('1', () => {
        return run(
            '.a{ width:calc(100% - 2px) }',
            '.a{ width:calc(100% - 2px) }',
            {
                deviceWidth: 100
            }
        );
    });

    it('2', () => {
        return run('.a{ width:calc(100% - 2) }', '.a{ width:calc(100% - 2) }', {
            deviceWidth: 100
        });
    });

    it('3', () => {
        return run(
            '.a{ padding: 10 0 calc(100% - 20px) 0}',
            '.a{ padding: 10vw 0 calc(100% - 20px) 0}',
            {
                deviceWidth: 100
            }
        );
    });

    it('4', () => {
        return run(
            '.a{ padding: 10 0 calc(100 / 20px) 0}',
            '.a{ padding: 10vw 0 calc(100 / 20px) 0}',
            {
                deviceWidth: 100
            }
        );
    });

    it('5', () => {
        return run(
            '.a{ padding: 10 0 calc(100px / 20) 0}',
            '.a{ padding: 10vw 0 calc(100px / 20) 0}',
            {
                deviceWidth: 100
            }
        );
    });

    it('6', () => {
        return run(
            '.a{ padding: 10 0 calc(100 / 20) 0}',
            '.a{ padding: 10vw 0 calc(100 / 20) 0}',
            {
                deviceWidth: 100
            }
        );
    });

    it('7', () => {
        return run(
            '.a{ padding: 10 0 calc(100% - 60 / 2) 0}',
            '.a{ padding: 10vw 0 calc(100% - 60 / 2) 0}',
            {
                deviceWidth: 100
            }
        );
    });

    it('8', () => {
        return run(
            '.a{ padding: 10 0 calc(100% - 30 * 2) 0}',
            '.a{ padding: 10vw 0 calc(100% - 30 * 2) 0}',
            {
                deviceWidth: 100
            }
        );
    });

    it('9', () => {
        return run(
            '.a{ padding: 10 0 calc(100 / 3 - 60 / 2) 0}',
            '.a{ padding: 10vw 0 calc(100 / 3 - 60 / 2) 0}',
            {
                deviceWidth: 100
            }
        );
    });

    it('10', () => {
        return run(
            '.a{ padding: 10 0 calc(100 / 3 - 60px / 2 + 4 * 5) 0}',
            '.a{ padding: 10vw 0 calc(100 / 3 - 60px / 2 + 4 * 5) 0}',
            {
                deviceWidth: 100
            }
        );
    });

    it('11', () => {
        return run(
            '.a{ border: 1 solid #333 }',
            '.a{ border: 1vw solid #333 }',
            {
                deviceWidth: 100
            }
        );
    });
    it('12', () => {
        return run(
            '.a{ border: 1 solid rgba(0, 0, 0, 1) }',
            '.a{ border: 1vw solid rgba(0, 0, 0, 1) }',
            {
                deviceWidth: 100
            }
        );
    });
});
