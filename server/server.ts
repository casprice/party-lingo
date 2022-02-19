interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    hello: () => void;
  }
  
  interface InterServerEvents {
    ping: () => void;
  }
  
  interface SocketData {
    name: string;
    age: number;
  }

  import { Server } from "socket.io";

  const io = new Server(3000, { /* options */ });
  
  io.on("connection", (socket) => {
    // ...
  });

  const mode = process.env.NODE_ENV;
const port = 8001;
server.listen(8001, () => {
  logger.info(`Server listening on :${port} [${mode}]`);
});