import axios from "axios";
import type { job } from "../queue/queue";

export async function submitCode(data: job) {
  const result = await axios.post("https://ce.judge0.com/submissions", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return result.data.token;
}
const token = await submitCode({
  language_id: "50",
  userId: "",
  source_code:'#include <stdio.h>\n\nint main(void) {\n  char name[10];\n  scanf("%s", name);\n  printf("hello, %s\\n", name);\n  return 0;\n}',
    stdin: "Saurav",
    "problem_id": ""
});
console.log(token);
export async function getResult() {
  const result = await axios.get(`https://ce.judge0.com/submissions/${token}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return result.data;
}
try{
   let result=await getResult();
if(result.status.description==="Processing")
result=await getResult();
console.log(result);
}
catch(e){ 
  console.log("Compilatin error")
}
 
 
