import express from "express";
import http from "http";
import { Server } from "socket.io";

const cors = require("cors");

const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());

var randomWords = require("random-words");
const projectId = "treehacks-341902";

// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;

// Instantiates a client
const translate = new Translate({ projectId });

io.on("connection", (socket) => {
  console.log("client connected");
});
server.listen(8000, () => console.log("listening on 8000"));

app.get("/word", async function (req, res) {
  // The text to translate
  const text = randomWords();

  // The target language
  const target = "zh";

  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);

  return res.json({ data: { english: text, chinese: translation } });
});
