const glob = require("glob-all");

describe("checking generated css js files", () => {
  it("should generate css js files", (done) => {
    const files = glob.sync(["./dist/index2_*.js", "./dist/index2_*.css"]);
    if (files.length > 0) {
      done();
    } else {
      throw new Error("no files found");
    }
  });
});
