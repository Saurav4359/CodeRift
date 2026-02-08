import { Option } from "../Components/options";
import { ProblemDescription } from "../Components/ProblemDescription";
import { CodeEditor } from "../pages/Editor";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export interface test {
  input: string;
  output: string;
}
const languageId = {
  java: 91,
  javascript: 102,
  c: 110,
  cpp: 105,
} as const;

export type langtype = keyof typeof languageId;

export interface probDetails {
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  timeLimit: number;
  memoryLimit: number;
  test: test[];
}

export function Submission() {
  const { problemId } = useParams();
  const [submit, setSubmit] = useState(false);
  const [ref, setRef] = useState<langtype>("cpp");
  const [sourceCode, setSourceCode] = useState("");
  const [data, setData] = useState<probDetails | null>(null);

  useEffect(() => {
    async function getResult() {
      const result = await axios.get(
        `http://localhost:3000/get/getProblemDescription/${problemId}`,
      );
      setData(result.data);
    }

    getResult();
  }, []);
  function submitCode() {
    if (!sourceCode || !sourceCode.trim()) {
      alert("Write your code");
      setSubmit(false);
      return;
    }
    try {
      async function submit() {
        const result = await axios.post(
          `http://localhost:3000/submit/submission/${problemId}`,
          JSON.stringify({
            language_id: `${languageId[ref]}`,
            code: sourceCode,
            memory: data?.memoryLimit,
            runtime: data?.timeLimit,
          }),
          {
            withCredentials: true,
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMDI2NGYzOC03Mzk2LTQ5NGUtOTRjZS0yNDY1NGJhZDAwOGEiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NzA1NjQ4MzUsImV4cCI6MTc3MDU2NzgzNX0.jzzNfUcphF1iWYYVNGx2ES12wu47t-YchFcPGGOGwvo",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        );
        
        console.table(result.data);
      }
      submit();
    } catch (e) {}

    setSubmit(true);
    console.log(sourceCode);
  }

  if (!data)
    return (
      <div className="  h-screen w-screen flex justify-center items-center">
        <p className="text-white text-3xl ">Loading ...</p>
      </div>
    );
  return (
    <>
      <div className="min-h-screen w-screen  flex justify-center items-center text-white select-none">
        <div className="  min-h-190 w-365 mt-20 flex justify-center items-center gap-1">
          <div className="   h-180  w-200 border border-white/40 rounded-2xl  flex justify-center items-center ">
            <ProblemDescription
              title={data?.title}
              description={data?.description}
              difficulty={data?.difficulty}
              tags={data.tags}
              timeLimit={data.timeLimit}
              memoryLimit={data.memoryLimit}
              test={data.test}
            />
          </div>
          <div className="  h-180 w-160  border border-white/40 rounded-2xl flex justify-center items-center">
            <div className=" h-170 w-150 ">
              <div className="h-15 w-150 flex justify-start items-end gap-10 border border-black/40 border-b-0 rounded-t-xl">
                <div className="  w-25 h-10 ml-1 flex justify-center items-center    ">
                  <Option setRef={setRef} />
                </div>
                <div className="  w-25 h-10 flex justify-center items-center ">
                  <button
                    onClick={submitCode}
                    className="border border-white/40 rounded-xl  w-20 h-8 hover:h-9 hover:w-22 hover:transition delay-100 duration-100 ease-in-out hover:cursor-pointer bg-red-600"
                  >
                    {submit ? (
                      <Link to="/mySubmissions">Submit</Link>
                    ) : (
                      <span> Submit</span>
                    )}
                  </button>
                </div>
                <div className="  w-27 h-9 flex justify-center items-center hover:underline hover:cursor-pointer border border-white/40 rounded-2xl mb-1">
                  <Link to={`/mySubmissions/`}>Submissions</Link>
                </div>
              </div>
              <CodeEditor language={ref} setSourceCode={setSourceCode} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
