const glob = require("glob-all");

describe("checking generated html files", () => {
  it("should generate html files", (done) => {
    const files = glob.sync(["./dist/index2.html"]);
    if (files.length > 0) {
      done();
    } else {
      throw new Error("no html files found");
    }
  });
});
