import { Example } from "../Components/Example";
import type { probDetails, test } from "./Submission";
export function ProblemDescription({
  title,
  memoryLimit,
  timeLimit,
  tags,
  description,
  test,
  difficulty,
}: probDetails) {
  return (
    <>
      <div className="overflow-y-scroll  overflow-x-hidden  h-175 w-195 border-black border-2 rounded grid  ">
        <div className="bg-red-800 w-195 h-30 grid  justify-center items-start">
          <div className="bg-blue-100 min-w-50 h-14 flex justify-center items-start text-4xl font-bold">
            {title}
          </div>
          <div className="bg-amber-500 h-6 min-w-50">
            MemoryLimit : {memoryLimit}
          </div>
          <div className="bg-amber-500 h-6 min-w-50">
            TimeLimit : {timeLimit}
          </div>
        </div>
        <div className="bg-red-800 w-195 min-h mt-1">
          <div className="h-8 bg-red-100 w-190 flex justify-start items-center gap-5 ml-3">
            <div className="min-w-20 h-8 bg-amber-400 flex justify-center items-center text-l rounded-2xl ">
              <span
                className={
                  difficulty === "EASY"
                    ? "text-green-400"
                    : difficulty === "MEDIUM"
                      ? "text-yellow-400"
                      : difficulty === "HARD"
                        ? "text-red-400"
                        : "text-white"
                }
              >
                {difficulty}
              </span>
            </div>
            <div className="bg-pink-500 h-8 min-w-50 flex justify-start items-center text-xl">
              {tags?.map(x => (x + ","))}
            </div>
          </div>
          <p className="w-190 bg-pink-50 mt-1 ml-3 font-medium text-black indent-20 text-balance whitespace-break-spaces break-keep">
            {description}   
          </p>
        </div>

        {test?.map((t: test) => (
          <Example input={t.input} output={t.output} />
        ))}
      </div>
    </>
  );
}
