const assert = require("assert");

describe("webpack.base.js test case", () => {
  const baseConfig = require("../../lib/webpack.base");
  it("entry", () => {
    assert.equal(
      baseConfig.entry.index2.indexOf(
        "/builder-webpack/test/smoke/template/src/index2/index.js"
      ) > 1,
      true
    );
  });
});
