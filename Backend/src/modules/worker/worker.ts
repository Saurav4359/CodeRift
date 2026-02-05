import { Worker } from "bullmq";
import { AddQueue } from "../queue/queue";
import { getResult, submitCode } from "../judge/execution";
import { GetHiddenTest, GetVisibleTest } from "../../utils/services";
import { DownloadFile } from "../Supabase/downloadFile";

const worker = new Worker(
  "Code",
  async (job) => {
    let testcasePassed = 1;
    const data = job.data;
    console.log(data);
    const HiddenTestCase = await GetHiddenTest(data.problemId);
    const VisibleTestCase = await GetVisibleTest(data.problemId);
    console.log(HiddenTestCase);
    console.log(VisibleTestCase);

    for (const test of VisibleTestCase) {
      const input = await DownloadFile(test.inputPath);
      const output = await DownloadFile(test.outputPath);
      data.stdin = input;
      const token = await submitCode(data);
      let result = await getResult(token);
      if (result.status.description === "Processing") {
        result = await getResult(token);
      }
         console.log(JSON.stringify(output));
      console.log(JSON.stringify(result.stdout));
      if (output === result.stdout.trim()) {
        testcasePassed++;
      }
      else {
        console.log("helo")
        console.log("testCase failed At ", testcasePassed);
        return `testCase failed At ${testcasePassed}`;
      }
    }
    for (const test of HiddenTestCase) {
      const input = await DownloadFile(test.inputPath);
      const output = await DownloadFile(test.outputPath);
      data.stdin = input;
      const token = await submitCode(data);
      let result = await getResult(token);
      if (result.status.description === "Processing") {
        result = await getResult(token);
      }
       
       console.log(JSON.stringify(output));
      console.log(JSON.stringify(result.stdout));
      if (output === result.stdout.trim()) testcasePassed++;
      else {
        console.log("testCase failed At ", testcasePassed);
        return `testCase failed At ${testcasePassed}`;
      }
    }

    // await AddQueue(data);
    return console.log("TestCase passed : ", testcasePassed);
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
