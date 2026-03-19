import { QueueEvents } from "bullmq";
import { redisConnection } from "../config/redis";
import { getIO } from "../sockets";

const queueEvents = new QueueEvents("generate-question-paper", {
  connection: redisConnection,
});

queueEvents.on("completed", async ({ jobId, returnvalue }) => {
  try {
    const io = getIO();
    const result = returnvalue as any;

    if (result?.assignmentId) {
      console.log(`Emitting assignment:generated for ${result.assignmentId}`);
      io.to(result.assignmentId.toString()).emit("assignment:generated", {
        assignmentId: result.assignmentId,
      });
    }
  } catch (error) {
    console.error("Socket emit failed (socket probably not initialized)", error);
  }
});
