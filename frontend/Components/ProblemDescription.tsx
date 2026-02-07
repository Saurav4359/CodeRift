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
      <div className="overflow-y-scroll  overflow-x-hidden  h-175 w-195 border-black border-2 rounded grid   ">
        <div className="  w-195 h-30 grid  justify-center items-start">
          <div className="  min-w-50 h-14 flex justify-center items-start text-4xl font-bold">
            {title}
          </div>
          <div className="  h-6 min-w-50">
            MemoryLimit : {memoryLimit}
          </div>
          <div className=" h-6 min-w-50">
            TimeLimit : {timeLimit}
          </div>
        </div>
        <div className=" w-195 min-h mt-1 ">
          <div className="h-8   w-190 flex justify-start items-center gap-5 ml-3">
            <div className="min-w-20 h-8  flex justify-center items-center text-l rounded-2xl  border border-white/40">
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
            <div className=" h-8 min-w-50 flex justify-start pl-1 items-center text-xl rounded-2xl border border-white/40">
              Tags: {tags?.map((x) => x + ",")}
            </div>
          </div>
          <p className="w-190 mt-5 ml-3 font-medium  indent-20 text-balance whitespace-break-spaces break-keep text-xl border border-white/40 rounded h-20 ">
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
