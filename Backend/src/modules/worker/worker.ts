import { Worker } from "bullmq";


  const worker = new Worker(
    "Code",
    async (job) => {
      console.log();
      return 0
    },
    {
      connection: {
        host: "localhost",
        port: 6379,
      },
    },
  );


  // worker.on("completed", async (job, result)=> {
  //   console.log(job);
  // })

  // worker.on("failed", async (Job, result )=> {
  //   console.log(Job);
  // })
