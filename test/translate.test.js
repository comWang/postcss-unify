const postcss = require("postcss");
const assert = require("better-assert");
const plugin = require("../index");

function run(input, output, opts) {
  return postcss([plugin(opts)])
    .process(input)
    .then(function (result) {
      assert(result.css === output);
    });
}

describe("Translate", function () {
  it("1", function () {
    return run(".a{ width:75 }", ".a{ width:75vw }", {
      deviceWidth: 100,
    });
  });

  it("2", function () {
    return run(
      ".a{ width: 20px; height: 30 }",
      ".a{ width: 20px; height: 30vw }",
      {
        deviceWidth: 100,
      }
    );
  });

  it("3", function () {
    return run(
      ".a{ padding-left: 20; padding-right: 30px }",
      ".a{ padding-left: 20vw; padding-right: 30px }",
      { deviceWidth: 100 }
    );
  });

  it("4", function () {
    return run(
      ".a{ padding: 10 20 30px 0 }",
      ".a{ padding: 10vw 20vw 30px 0 }",
      { deviceWidth: 100 }
    );
  });

  it("5", function () {
    return run(
      ".a{ padding: 10 20 30px 0 }",
      ".a{ padding: 10vw 20vw 30px 0 }",
      { deviceWidth: 100 }
    );
  });

  it("6", function () {
    return run(
      ".a{ margin: 20 30px 40 50px }",
      ".a{ margin: 20vw 30px 40vw 50px }",
      { deviceWidth: 100 }
    );
  });

  it("7", function () {
    return run(".a{ font-size: 16 }", ".a{ font-size: 16vw }", {
      deviceWidth: 100,
    });
  });

  it("8", function () {
    return run(".a{ font-size: 16px }", ".a{ font-size: 16px }", {
      deviceWidth: 100,
    });
  });

  it("9", function () {
    return run(".a{ border-width: 6 }", ".a{ border-width: 6vw }", {
      deviceWidth: 100,
    });
  });

  it("10", function () {
    return run(
      ".a{ left: 0; right: 0; top: 50; min-width: 400; min-height: 600px }",
      ".a{ left: 0; right: 0; top: 50vw; min-width: 400vw; min-height: 600px }",
      { deviceWidth: 100 }
    );
  });

  it("11", function () {
    return run(
      ".a{ margin:   10    30    40    50; }",
      ".a{ margin:   10vw 30vw 40vw 50vw; }",
      { deviceWidth: 100 }
    );
  });
});
