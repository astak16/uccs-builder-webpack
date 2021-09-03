if (typeof window === "undefined") {
  global.window = {};
}
const express = require("express");
const { renderToString } = require("react-dom/server");
const SSR = require("../dist/index2-server.js");
const fs = require("fs");
const path = require("path");
const template = fs.readFileSync(
  path.join(__dirname, "../dist/index2.html"),
  "utf-8"
);

const server = (port) => {
  const app = express();
  app.use(express.static("dist"));
  app.get("/search", (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    console.log(html);
    res.status(200).send(html);
  });
  app.listen(port, () => {
    console.log("Server is running on port: " + port);
  });
};

server(process.env.PORT || 3000);

const renderMarkup = (str) => {
  return template.replace("<!--HTML_PLACEHOLDER-->", str);
};
