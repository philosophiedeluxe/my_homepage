const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const portArgument = process.argv.find((argument) => argument.startsWith("--port="));
const port = Number(portArgument?.slice("--port=".length) || process.env.PORT || 4173);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const relativePath = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const target = path.resolve(root, relativePath);
  if (!target.startsWith(root)) {
    response.writeHead(403).end();
    return;
  }

  fs.readFile(target, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500).end("Not found");
      return;
    }
    response.writeHead(200, { "Content-Type": contentTypes[path.extname(target)] || "application/octet-stream" });
    response.end(content);
  });
}).listen(port, () => console.log(`Static site available at http://127.0.0.1:${port}`));
