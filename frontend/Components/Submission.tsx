import { Option } from "../Components/options";
import { ProblemDescription } from "../Components/ProblemDescription";
import { CodeEditor } from "../pages/Editor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export interface test {
  input: string;
  output: string;
}
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
  if (!data) return <p>Loading ...</p>;
  return (
    <>
      <div className="min-h-screen w-screen bg-red-400 flex justify-center items-center text-white">
        <div className="bg-pink-300 min-h-190 w-365 mt-20 flex justify-center items-center gap-1">
          <div className="bg-amber-300  h-180  w-200 border border-white/40 rounded-2xl  flex justify-center items-center ">
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
          <div className="bg-amber-300 h-180 w-160  border border-white/40 rounded-2xl flex justify-center items-center">
            <div className="bg-red-300 h-170 w-150 ">
              <div className="h-15 w-150 bg-blue-300 flex justify-start items-end gap-10 border border-black/40 border-b-0 rounded-t-xl">
                <div className="bg-red-500 w-25 h-10 ml-1 flex justify-center items-center   ">
                  <Option />
                </div>
                <div className="bg-red-500 w-25 h-10 flex justify-center items-center ">
                  <button className="border border-black rounded-xl w-20 h-8 hover:h-9 hover:w-22 hover:transition delay-100 duration-100 ease-in-out hover:cursor-pointer">
                    Submit
                  </button>
                </div>
                <div className="bg-red-500 w-25 h-10 flex justify-center items-center hover:underline hover:cursor-pointer">
                  Submission
                </div>
              </div>
              <CodeEditor language="javascript" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
