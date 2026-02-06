import { Search } from "../icons/search";
import { ProblemBar } from "../Components/Problembar";
import axios from "axios";
import { useEffect, useState } from "react";

interface probDetails {
  index: number;
  title: string;
  description: string;
  tags: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD";
  timeLimit: number;
  memoryLimit: number;
}
export function Problem() {
  const [problems, setProblems] = useState<probDetails[] | []>([]);

  useEffect(() => {
    async function getProblems() {
      const data = await axios.get("http://localhost:3000/get/problems");
      setProblems(data.data);
    }

    getProblems();
  }, []);

  return (
    <>
      <div className="  h-screen w-full">
        <div className="bg-gray-900/60 h-min mt-25 mx-5 border border-white/40 rounded-2xl flex-wrap p-2">
          <div className=" mt-2 h-10 w-80 mx-20 flex justify-center items-center mb-3">
            <span className=" absolute mr-55 mt-0.5">
              <Search />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="h-8 w-65 px-8 rounded-3xl focus:outline-black border border-white/40 text-white"
            />
          </div>
          <div className="grid justify-center gap-3">
            {problems.map((problem, index) => (
              <ProblemBar
                 index={index}
                title={problem.title}
                difficulty={problem.difficulty}
                tags={problem.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
