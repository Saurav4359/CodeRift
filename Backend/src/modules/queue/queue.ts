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
  problem_id: string;
}
export async function AddQueue(data: job) {
  await queue.add(`${data.problem_id}`, data);
  console.log("Job added to queue");
  await queue.close();
}
