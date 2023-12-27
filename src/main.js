import http from "node:http";
import { createReadStream, readFile } from "node:fs";
import path from "node:path";

const srcPath = path.join(path.resolve("."), "src");

export const server = http.createServer();

const meHandler = (req, res) => {
  console.log("path in me handler: ", req.url);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "response from me endpoint",
    })
  );
};

const youHandler = (req, res) => {
  console.log("path in you handler: ", req.url);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "response from you",
    })
  );
};

const streamHandler = async (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  const filePath = path.join(srcPath, "abc.txt");
  const readableStream = createReadStream(filePath, { encoding: "utf8" });
  readableStream.on("error", (err) => {
    res.statusCode(500).end("some thing went wrong");
    throw err;
  });
  readableStream.on("end", () => {
    res.end("file is end");
  });
  readableStream.pipe(res);
};

const serverSentEventHandler = async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  });
  for (let i = 0; i < 5; i++) {
    res.write("event: message\n");
    res.write(`data: this is some random data ${i} with event data\n`);
    res.write(`id: ${i}\n\n`);
    await _writeSleep();
    if (i == 4) {
      res.write("event: end\n");
      res.write(`data: this is last message  event data\n\n`);
      res.end("server sent event closed");
      return;
    }
  }
};

const bufferHandler = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  const filePath = path.join(srcPath, "abc.txt");

  readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    res.write(data);
    res.end("finished");
  });
};

const exeminePath = {
  "/me": meHandler,
  "/you": youHandler,
  "/stream": streamHandler,
  "/server-sent-event": serverSentEventHandler,
  "/buffer": bufferHandler,
};

const _writeSleep = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};

server.on("request", async (req, res) => {
  console.log("path: ", req.url);
  console.log("req raw headers: ", req.rawHeaders);

  if(!Object.keys(exeminePath).includes(req.url)){
      res.writeHead(400).end("Invalid url")
      return;
  }
  return exeminePath[req.url](req,res)

});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

export function sum(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
