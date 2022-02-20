import express from 'express';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on("connection", function(socket: any) {
    console.log("Client connected!")
    socket.on("msg", function(msg: any) {
      console.log(msg)
    })
  })

app.get('/', (req, res) => {
    res.send(
      [
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
      ]
    )});

app.listen(8000, () => {
    console.log('The application is listening on port 8000!');
})