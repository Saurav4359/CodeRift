import { Job, Queue } from "bullmq";
const queue = new Queue("Code", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

export interface job {
  userId: string
  language_id: string;
  source_code: string;
  stdin: string;
  problemId: string;
}
export async function AddQueue(data: job) {
  await queue.add(`${data.problemId}`, data);
  console.log("Job added to queue");
  await queue.close();
}
