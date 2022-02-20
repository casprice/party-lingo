import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});
var randomWords = require('random-words');
const projectId = 'treehacks-341902';

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Instantiates a client
const translate = new Translate({projectId});

io.on("connection", (socket) => {
  console.log("client connected");
});
server.listen(8000, () => console.log("listening on 8000"));

app.get("/", (req, res) => {
  res.send([
    { index: 0, english: "ice cream", chinese: "冰淇淋" },
    { index: 1, english: "water", chinese: "水" },
    { index: 2, english: "sweater", chinese: "毛衣" },
    { index: 3, english: "dog", chinese: "够" },
    { index: 4, english: "hurry", chinese: "快点" },
    { index: 5, english: "cat", chinese: "猫" },
    { index: 6, english: "tree", chinese: "树" },
    { index: 7, english: "mother", chinese: "妈妈" },
    { index: 8, english: "flower", chinese: "花" },
    { index: 9, english: "candle", chinese: "蜡烛" },
  ]);
});

app.post("/", (req, res)) => {
  res.send(getRandomWord())
}

async function getRandomWord() {
  // The text to translate
  const text = randomWords();

  // The target language
  const target = 'zh';

  // Translates some text into Russian
  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);

  return [text, translation]
}

