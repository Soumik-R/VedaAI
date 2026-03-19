import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { initSocket } from "./sockets";
// Import queue events here so they actively listen on the server process
import "./queues/queue.events";

dotenv.config();

const PORT = 5000;

const server = http.createServer(app);
initSocket(server);

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
