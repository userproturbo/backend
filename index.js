import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  res.end("Hello backend 👋");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
