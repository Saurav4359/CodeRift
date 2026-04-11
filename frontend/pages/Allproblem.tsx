import { Search } from "../icons/search";
import { ProblemBar } from "../Components/Problembar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { BACKEND_URL, getRole } from "../Auth/role";

interface probDetails {
  index: number;
  title: string;
  tags: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD";
  id: string;
}
export function Problem() {
  const [problems, setProblems] = useState<probDetails[] | []>([]);

  useEffect(() => {
    async function getProblems() {
      const data = await axios.get(`${BACKEND_URL}/get/problems`);
      setProblems(data.data);
    }

    getProblems();
  }, []);

  return (
    <>
      <div className="  h-screen w-full ">
        <div className="bg-gray-900/20 h-min mt-25 mx-5 border border-white/40 rounded-2xl flex-wrap p-2">
          <div className=" mt-2 h-10 w-150 mx-20 flex justify-around items-center mb-3  ">
            <span
              className={`absolute ${getRole() === "ADMIN" ? "mr-110" : "mr-55"} mt-0.5`}
            >
              <Search />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="h-8 w-65 px-8 rounded-3xl focus:outline-black border border-white/40 text-white"
            />

            {getRole() === "ADMIN" ? (
              <Link to="/addProblem">
                <button className="bg-sky-200 h-10 w-28 rounded-xl border hover:bg-sky-300/90 hover:cursor-pointer transition hover:border-white/30 ">
                  Add questions
                </button>
              </Link>
            ) : (
              <> </>
            )}
          </div>

          <div className="grid justify-center gap-3 ">
            {problems.map((problem, index) => (
              <Link to={`/submission/${problem.id}`}>
                <ProblemBar
                  index={index}
                  title={problem.title}
                  difficulty={problem.difficulty}
                  tags={problem.tags}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
